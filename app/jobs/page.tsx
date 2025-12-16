import Link from "next/link";
import { searchJobs } from "@/actions/job";

interface JobsPageProps {
  searchParams?: Promise<{
    keyword?: string;
    location?: string;
    salaryMin?: string;
    salaryMax?: string;
    jobType?: string;
  }>;
}

export default async function JobsPage(props: JobsPageProps) {
  const searchParams = await props.searchParams;
  const filters = {
    keyword: searchParams?.keyword || undefined,
    location: searchParams?.location || undefined,
    salaryMin: searchParams?.salaryMin ? Number(searchParams.salaryMin) : undefined,
    salaryMax: searchParams?.salaryMax ? Number(searchParams.salaryMax) : undefined,
    jobType: searchParams?.jobType || undefined,
  };

  const res = await searchJobs(filters);
  const jobs = res.success && res.jobs ? res.jobs : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="bg-gradient-to-r from-[#141414] to-[#0f0f0f] border-b border-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">Browse Jobs</h1>
            </div>
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 hover:bg-white/5 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white">Filter Jobs</h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4" method="GET">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keyword
              </label>
              <input
                type="text"
                name="keyword"
                defaultValue={searchParams?.keyword || ""}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Job title, skills..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={searchParams?.location || ""}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="City, state, or remote"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                defaultValue={searchParams?.jobType || ""}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">All Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                name="salaryMin"
                defaultValue={searchParams?.salaryMin || ""}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="$0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Max Salary
              </label>
              <input
                type="number"
                name="salaryMax"
                defaultValue={searchParams?.salaryMax || ""}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="$200,000"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all font-medium shadow-lg shadow-blue-500/30"
              >
                Search Jobs
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
          </div>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-16 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-300 text-lg mb-2">No jobs found matching your criteria</p>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            jobs.map((job: any, index: number) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="block group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/5 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-blue-500/5 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.employer?.companyName || "Company"}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.jobType.replace("_", " ")}
                      </span>
                      {(job.salaryMin || job.salaryMax) && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ${job.salaryMin?.toLocaleString() || "0"} - ${job.salaryMax?.toLocaleString() || "0"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
                      View Details
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 line-clamp-2 leading-relaxed mb-4">{job.description}</p>
                <div className="text-sm text-gray-500">
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
