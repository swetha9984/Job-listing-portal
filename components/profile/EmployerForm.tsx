'use client'

import { updateEmployerProfile } from "@/actions/user";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerForm({ profile }: { profile: any }) {
  const [formData, setFormData] = useState({
    companyName: profile?.companyName || "",
    website: profile?.website || "",
    description: profile?.description || "",
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
      const result = await updateEmployerProfile(formData);
      if (result.success) {
        alert("Profile updated successfully!");
        router.push("/dashboard/employer");
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
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company Name
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          placeholder="Your Company Name"
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company Website
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourcompany.com"
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Company Description
        </label>
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell job seekers about your company, culture, and what makes you unique..."
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
        />
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
