import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (user?.role) {
      if (user.role === "EMPLOYER") {
        redirect("/dashboard/employer");
      } else {
        redirect("/dashboard/job-seeker");
      }
    } else {
      redirect("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex justify-between items-center mb-20 animate-fade-in-up">
          <div className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
              JobPortal
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href="/sign-in"
              className="px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-5xl mx-auto mb-32">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Find Your Dream Job<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
                or Hire Top Talent
              </span>
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with opportunities that match your ambitions. Whether you're building a team or advancing your career, we make it seamless.
            </p>
          </div>
          <div className="flex gap-5 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <Link
              href="/sign-up"
              className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-lg font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Start Hiring
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/jobs"
              className="group px-10 py-4 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-lg font-semibold backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                Browse Jobs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">For Employers</h3>
            <p className="text-gray-400 leading-relaxed text-lg">Post jobs, manage applications, and find the perfect candidates for your team with powerful tools.</p>
          </div>

          <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-emerald-400 transition-colors">For Job Seekers</h3>
            <p className="text-gray-400 leading-relaxed text-lg">Browse opportunities, apply with ease, and track your applications all in one intuitive platform.</p>
          </div>

          <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-400 transition-colors">Fast & Easy</h3>
            <p className="text-gray-400 leading-relaxed text-lg">Simple interface with powerful features. Get started in minutes with our streamlined process.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-16 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'backwards' }}>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-gray-400 text-lg">Active Job Listings</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-400 text-lg">Trusted Companies</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">5000+</div>
              <div className="text-gray-400 text-lg">Active Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
