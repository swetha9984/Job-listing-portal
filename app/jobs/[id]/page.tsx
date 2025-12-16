
import { getJobById, hasAppliedToJob } from "@/actions/job";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApplyButton from "@/components/jobs/ApplyButton";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage(props: JobDetailPageProps) {
  const params = await props.params;
  const { userId } = await auth();
  const jobRes = await getJobById(params.id);

  if (!jobRes.success || !jobRes.job) {
    redirect("/jobs");
  }

  const job = jobRes.job;
  const applicationStatus = userId ? await hasAppliedToJob(params.id) : { hasApplied: false };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="container mx-auto px-4 py-4">
          <Link href="/jobs" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-lg text-gray-400 mb-4">
                  <span className="flex items-center gap-2">
                    🏢 {job.employer.companyName || "Company"}
                  </span>
                  <span className="flex items-center gap-2">📍 {job.location}</span>
                  <span className="flex items-center gap-2">
                    💼 {job.jobType.replace("_", " ")}
                  </span>
                </div>
                {(job.salaryMin || job.salaryMax) && (
                  <div className="text-2xl font-semibold text-emerald-400 mb-4">
                    ${job.salaryMin?.toLocaleString() || "0"} - $
                    {job.salaryMax?.toLocaleString() || "0"}
                  </div>
                )}
              </div>
            </div>

            {userId && (
              <div className="mb-6">
                {applicationStatus.hasApplied ? (
                  <div className="px-6 py-4 bg-emerald-500/10 text-emerald-400 rounded-xl text-center font-medium border border-emerald-500/20">
                    ✓ You have applied to this job
                  </div>
                ) : (
                  <ApplyButton jobId={job.id} />
                )}
              </div>
            )}

            {!userId && (
              <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <p className="text-gray-300">
                  <Link href="/sign-in" className="font-semibold text-indigo-400 hover:text-indigo-300 underline">
                    Sign in
                  </Link>{" "}
                  or{" "}
                  <Link href="/sign-up" className="font-semibold text-indigo-400 hover:text-indigo-300 underline">
                    create an account
                  </Link>{" "}
                  to apply for this job
                </p>
              </div>
            )}

            <div className="text-sm text-gray-500">
              Posted on {new Date(job.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
              {job.description}
            </div>
          </div>

          {job.requirements && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
              <div className="prose max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                {job.requirements}
              </div>
            </div>
          )}

          {job.employer.description && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">About the Company</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">{job.employer.description}</p>
              {job.employer.website && (
                <a
                  href={job.employer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                >
                  Visit Company Website →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
