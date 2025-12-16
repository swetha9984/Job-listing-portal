
'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create a new job posting
export const createJob = async (data: {
    title: string;
    description: string;
    location: string;
    salaryMin?: number;
    salaryMax?: number;
    jobType: string;
    requirements?: string;
}) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { employerProfile: true }
        });

        if (!user || user.role !== "EMPLOYER" || !user.employerProfile) {
            throw new Error("Only employers can create jobs");
        }

        const job = await db.job.create({
            data: {
                employerId: user.employerProfile.id,
                title: data.title,
                description: data.description,
                location: data.location,
                salaryMin: data.salaryMin,
                salaryMax: data.salaryMax,
                jobType: data.jobType,
                requirements: data.requirements,
            }
        });

        revalidatePath("/dashboard/employer");
        revalidatePath("/jobs");
        return { success: true, job };
    } catch (error) {
        console.error("Error creating job:", error);
        return { success: false, error: "Failed to create job" };
    }
}

// Update an existing job
export const updateJob = async (jobId: string, data: {
    title?: string;
    description?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    jobType?: string;
    requirements?: string;
    status?: string;
}) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { employerProfile: true }
        });

        if (!user || !user.employerProfile) {
            throw new Error("Unauthorized");
        }

        // Verify the job belongs to this employer
        const job = await db.job.findUnique({ where: { id: jobId } });
        if (!job || job.employerId !== user.employerProfile.id) {
            throw new Error("Unauthorized to edit this job");
        }

        const updatedJob = await db.job.update({
            where: { id: jobId },
            data
        });

        revalidatePath("/dashboard/employer");
        revalidatePath("/jobs");
        revalidatePath(`/jobs/${jobId}`);
        return { success: true, job: updatedJob };
    } catch (error) {
        console.error("Error updating job:", error);
        return { success: false, error: "Failed to update job" };
    }
}

// Delete a job
export const deleteJob = async (jobId: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { employerProfile: true }
        });

        if (!user || !user.employerProfile) {
            throw new Error("Unauthorized");
        }

        // Verify the job belongs to this employer
        const job = await db.job.findUnique({ where: { id: jobId } });
        if (!job || job.employerId !== user.employerProfile.id) {
            throw new Error("Unauthorized to delete this job");
        }

        await db.job.delete({ where: { id: jobId } });

        revalidatePath("/dashboard/employer");
        revalidatePath("/jobs");
        return { success: true };
    } catch (error) {
        console.error("Error deleting job:", error);
        return { success: false, error: "Failed to delete job" };
    }
}

// Get all jobs for an employer
export const getEmployerJobs = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { employerProfile: true }
        });

        if (!user || !user.employerProfile) {
            throw new Error("Unauthorized");
        }

        const jobs = await db.job.findMany({
            where: { employerId: user.employerProfile.id },
            include: {
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, jobs };
    } catch (error) {
        console.error("Error fetching employer jobs:", error);
        return { success: false, error: "Failed to fetch jobs" };
    }
}

// Search jobs with filters
export const searchJobs = async (filters?: {
    keyword?: string;
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    jobType?: string;
}) => {
    try {
        const where: any = { status: "ACTIVE" };

        if (filters?.keyword) {
            where.OR = [
                { title: { contains: filters.keyword, mode: 'insensitive' } },
                { description: { contains: filters.keyword, mode: 'insensitive' } }
            ];
        }

        if (filters?.location) {
            where.location = { contains: filters.location, mode: 'insensitive' };
        }

        if (filters?.salaryMin) {
            where.salaryMax = { gte: filters.salaryMin };
        }

        if (filters?.salaryMax) {
            where.salaryMin = { lte: filters.salaryMax };
        }

        if (filters?.jobType) {
            where.jobType = filters.jobType;
        }

        const jobs = await db.job.findMany({
            where,
            include: {
                employer: {
                    select: {
                        companyName: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, jobs };
    } catch (error) {
        console.error("Error searching jobs:", error);
        return { success: false, error: "Failed to search jobs" };
    }
}

// Get a single job by ID
export const getJobById = async (jobId: string) => {
    try {
        const job = await db.job.findUnique({
            where: { id: jobId },
            include: {
                employer: {
                    select: {
                        companyName: true,
                        website: true,
                        description: true
                    }
                }
            }
        });

        if (!job) {
            return { success: false, error: "Job not found" };
        }

        return { success: true, job };
    } catch (error) {
        console.error("Error fetching job:", error);
        return { success: false, error: "Failed to fetch job" };
    }
}

// Apply to a job
export const applyToJob = async (jobId: string, coverLetter?: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { jobSeekerProfile: true }
        });

        if (!user || user.role !== "JOB_SEEKER" || !user.jobSeekerProfile) {
            throw new Error("Only job seekers can apply to jobs");
        }

        // Check if already applied
        const existingApplication = await db.application.findUnique({
            where: {
                jobId_jobSeekerId: {
                    jobId,
                    jobSeekerId: user.jobSeekerProfile.id
                }
            }
        });

        if (existingApplication) {
            return { success: false, error: "You have already applied to this job" };
        }

        const application = await db.application.create({
            data: {
                jobId,
                jobSeekerId: user.jobSeekerProfile.id,
                coverLetter
            }
        });

        revalidatePath("/dashboard/job-seeker");
        revalidatePath(`/jobs/${jobId}`);
        return { success: true, application };
    } catch (error) {
        console.error("Error applying to job:", error);
        return { success: false, error: "Failed to apply to job" };
    }
}

// Get applications for a job (employer view)
export const getJobApplications = async (jobId: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { employerProfile: true }
        });

        if (!user || !user.employerProfile) {
            throw new Error("Unauthorized");
        }

        // Verify the job belongs to this employer
        const job = await db.job.findUnique({ where: { id: jobId } });
        if (!job || job.employerId !== user.employerProfile.id) {
            throw new Error("Unauthorized to view these applications");
        }

        const applications = await db.application.findMany({
            where: { jobId },
            include: {
                jobSeeker: {
                    select: {
                        firstName: true,
                        lastName: true,
                        bio: true,
                        resumeUrl: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, applications };
    } catch (error) {
        console.error("Error fetching applications:", error);
        return { success: false, error: "Failed to fetch applications" };
    }
}

// Get my applications (job seeker view)
export const getMyApplications = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { jobSeekerProfile: true }
        });

        if (!user || !user.jobSeekerProfile) {
            throw new Error("Unauthorized");
        }

        const applications = await db.application.findMany({
            where: { jobSeekerId: user.jobSeekerProfile.id },
            include: {
                job: {
                    include: {
                        employer: {
                            select: {
                                companyName: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, applications };
    } catch (error) {
        console.error("Error fetching applications:", error);
        return { success: false, error: "Failed to fetch applications" };
    }
}

// Check if user has applied to a job
export const hasAppliedToJob = async (jobId: string) => {
    const { userId } = await auth();
    if (!userId) return { hasApplied: false };

    try {
        const user = await db.user.findUnique({
            where: { clerkId: userId },
            include: { jobSeekerProfile: true }
        });

        if (!user || !user.jobSeekerProfile) {
            return { hasApplied: false };
        }

        const application = await db.application.findUnique({
            where: {
                jobId_jobSeekerId: {
                    jobId,
                    jobSeekerId: user.jobSeekerProfile.id
                }
            }
        });

        return { hasApplied: !!application, application };
    } catch (error) {
        console.error("Error checking application:", error);
        return { hasApplied: false };
    }
}
