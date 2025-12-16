'use client'

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-gray-400">Create your account to begin your journey</p>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
