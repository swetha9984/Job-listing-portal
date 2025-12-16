import { getJobApplications } from "@/actions/job";
import Link from "next/link";

interface Props {
    params: { id: string };
}

export default async function JobApplicationsPage({ params }: Props) {
    const jobId = params.id;
    const res = await getJobApplications(jobId);

    if (!res.success) {
        return (
            <div className="min-h-screen bg-[#0f0f0f]">
                <div className="container mx-auto max-w-4xl py-10">
                    <p className="text-red-400">Failed to load applications.</p>
                </div>
            </div>
        );
    }

    const applications = res.applications || [];

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            <div className="container mx-auto max-w-4xl py-10 px-4">
                <Link href="/dashboard/employer" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 mb-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                
                <h1 className="mb-6 text-3xl font-bold text-white">Job Applications</h1>

                <div className="rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] p-6">
                    {applications.length === 0 ? (
                        <p className="text-gray-400">No applications for this job yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {applications.map((app: any) => (
                                <div key={app.id} className="flex items-center justify-between rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] p-4 hover:border-indigo-500/50 transition-colors">
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            {app.jobSeeker.firstName} {app.jobSeeker.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                                        </p>
                                        {app.jobSeeker.bio ? (
                                            <p className="mt-1 text-sm text-gray-400">{app.jobSeeker.bio}</p>
                                        ) : null}
                                        {app.jobSeeker.resumeUrl ? (
                                            <p className="mt-1 text-sm">
                                                <Link
                                                    href={app.jobSeeker.resumeUrl}
                                                    className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                                                    target="_blank"
                                                >
                                                    View Resume
                                                </Link>
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className={`text-sm px-3 py-1 rounded-full ${
                                        app.status === "PENDING"
                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                            : app.status === "REVIEWED"
                                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                            : app.status === "ACCEPTED"
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                                    }`}>
                                        {app.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
