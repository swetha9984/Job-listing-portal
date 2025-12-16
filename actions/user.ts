'use server'

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (role: "JOB_SEEKER" | "EMPLOYER") => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    try {
        const dbUser = await db.user.upsert({
            where: { clerkId: userId },
            update: { role },
            create: {
                clerkId: userId,
                email: user.emailAddresses[0].emailAddress,
                role,
            }
        });

        if (role === "JOB_SEEKER") {
            await db.jobSeekerProfile.upsert({
                where: { userId: dbUser.id },
                create: { userId: dbUser.id },
                update: {}
            });
        } else {
            await db.employerProfile.upsert({
                where: { userId: dbUser.id },
                create: { userId: dbUser.id },
                update: {}
            });
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error updating role:", error);
        return { success: false, error: "Failed to update role" };
    }
}

export const updateJobSeekerProfile = async (data: any) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user) throw new Error("User not found");

        await db.jobSeekerProfile.update({
            where: { userId: user.id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                resumeUrl: data.resumeUrl,
            }
        });
        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating job seeker profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

export const updateEmployerProfile = async (data: any) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const user = await db.user.findUnique({ where: { clerkId: userId } });
        if (!user) throw new Error("User not found");

        await db.employerProfile.update({
            where: { userId: user.id },
            data: {
                companyName: data.companyName,
                website: data.website,
                description: data.description,
            }
        });
        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating employer profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
