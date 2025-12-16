'use client'

import { updateUserRole } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
    const { user } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRoleSelection = async (role: "JOB_SEEKER" | "EMPLOYER") => {
        setLoading(true);
        try {
            const result = await updateUserRole(role);
            if (result.success) {
                router.push(role === "JOB_SEEKER" ? "/profile" : "/profile");
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f] p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] p-8 shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Welcome, {user?.firstName}!</h1>
                    <p className="mt-2 text-gray-400">Please select your role to continue.</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleRoleSelection("JOB_SEEKER")}
                        disabled={loading}
                        className="flex w-full items-center justify-between rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] p-5 transition-all hover:border-indigo-500 hover:bg-[#252525] disabled:opacity-50 group"
                    >
                        <div className="text-left">
                            <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">I am a Job Seeker</h3>
                            <p className="text-sm text-gray-400">I want to find and apply for jobs.</p>
                        </div>
                        <span className="text-2xl">🔍</span>
                    </button>

                    <button
                        onClick={() => handleRoleSelection("EMPLOYER")}
                        disabled={loading}
                        className="flex w-full items-center justify-between rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] p-5 transition-all hover:border-emerald-500 hover:bg-[#252525] disabled:opacity-50 group"
                    >
                        <div className="text-left">
                            <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">I am an Employer</h3>
                            <p className="text-sm text-gray-400">I want to post jobs and hire talent.</p>
                        </div>
                        <span className="text-2xl">🏢</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
