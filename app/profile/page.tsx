import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import JobSeekerForm from "@/components/profile/JobSeekerForm";
import EmployerForm from "@/components/profile/EmployerForm";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      jobSeekerProfile: true,
      employerProfile: true,
    },
  });

  if (!user) redirect("/onboarding");

  const dashboardUrl = user.role === "JOB_SEEKER" ? "/dashboard/job-seeker" : "/dashboard/employer";

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href={dashboardUrl} className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <SignOutButton>
              <button className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all font-medium">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">
              {user.role === "JOB_SEEKER" ? "Job Seeker Profile" : "Employer Profile"}
            </h1>

            {user.role === "JOB_SEEKER" && user.jobSeekerProfile && (
              <JobSeekerForm profile={user.jobSeekerProfile} />
            )}

            {user.role === "EMPLOYER" && user.employerProfile && (
              <EmployerForm profile={user.employerProfile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
