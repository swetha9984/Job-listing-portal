'use client'

import { useState } from 'react';
import { applyToJob } from '@/actions/job';
import { useRouter } from 'next/navigation';

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const router = useRouter();

  const handleApply = async () => {
    setLoading(true);
    try {
      const res = await applyToJob(jobId, coverLetter || undefined);
      if (res.success) {
        alert('Application submitted successfully!');
        router.refresh();
      } else {
        alert(res.error || 'Failed to apply');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while applying.');
    } finally {
      setLoading(false);
    }
  };

  if (!showCoverLetter) {
    return (
      <div className="flex gap-4">
        <button
          onClick={() => setShowCoverLetter(true)}
          className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all font-semibold text-lg shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
        >
          Apply Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Cover Letter (Optional)
        </label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          placeholder="Tell the employer why you're a great fit for this role..."
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setShowCoverLetter(false)}
          className="flex-1 px-6 py-3 bg-[#2a2a2a] text-gray-300 rounded-xl hover:bg-[#333] transition-all font-medium border border-[#3a3a3a]"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all font-semibold disabled:opacity-50 shadow-lg shadow-indigo-500/20"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}
