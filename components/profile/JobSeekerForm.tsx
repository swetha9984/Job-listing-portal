'use client'

import { updateJobSeekerProfile } from "@/actions/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobSeekerForm({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    bio: profile?.bio || "",
    resumeUrl: profile?.resumeUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateJobSeekerProfile(formData);
      if (result.success) {
        alert("Profile updated successfully!");
        router.push("/dashboard/job-seeker");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Professional Bio
        </label>
        <textarea
          name="bio"
          rows={5}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell employers about your experience, skills, and career goals..."
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Resume URL
        </label>
        <input
          type="url"
          name="resumeUrl"
          value={formData.resumeUrl}
          onChange={handleChange}
          placeholder="https://example.com/your-resume.pdf"
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        <p className="mt-2 text-sm text-gray-500">
          Upload your resume to a cloud service and paste the link here
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all font-semibold disabled:opacity-50 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
