
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

interface ApplicationsPageProps {
  params: Promise<{ jobId: string }>;
}

export default async function ApplicationsPage(props: ApplicationsPageProps) {
  const params = await props.params;
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { employerProfile: true },
  });

  if (!user || user.role !== "EMPLOYER" || !user.employerProfile) {
    redirect("/onboarding");
  }

  const job = await db.job.findUnique({
    where: { id: params.jobId },
    include: {
      applications: {
        include: {
          jobSeeker: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!job || job.employerId !== user.employerProfile.id) {
    redirect("/dashboard/employer");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard/employer" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <div className="flex gap-4 text-gray-400">
              <span>📍 {job.location}</span>
              <span>💼 {job.jobType}</span>
              <span>📝 {job.applications.length} Applications</span>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Applications</h2>
            {job.applications.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No applications yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {job.applications.map((application) => (
                  <div
                    key={application.id}
                    className="border border-[#2a2a2a] bg-[#1f1f1f] rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {application.jobSeeker.firstName} {application.jobSeeker.lastName}
                        </h3>
                        <div className="text-sm text-gray-400">
                          Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : application.status === "REVIEWED"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            : application.status === "ACCEPTED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>

                    {application.jobSeeker.bio && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-300 mb-2">Bio</h4>
                        <p className="text-gray-400 leading-relaxed">{application.jobSeeker.bio}</p>
                      </div>
                    )}

                    {application.coverLetter && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-300 mb-2">Cover Letter</h4>
                        <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{application.coverLetter}</p>
                      </div>
                    )}

                    {application.jobSeeker.resumeUrl && (
                      <div className="mb-4">
                        <a
                          href={application.jobSeeker.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                        >
                          View Resume →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
