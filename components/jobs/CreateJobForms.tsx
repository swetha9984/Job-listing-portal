'use client'

import { useState } from 'react';
import { createJob } from '@/actions/job';

export default function CreateJobForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        jobType: 'FULL_TIME',
        requirements: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
                salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
                jobType: formData.jobType,
                requirements: formData.requirements
            };
            const res = await createJob(data as any);
            if (res.success) {
                alert('Job created successfully');
                setFormData({ title: '', description: '', location: '', salaryMin: '', salaryMax: '', jobType: 'FULL_TIME', requirements: '' });
                window.location.reload();
            } else {
                alert(res.error || 'Failed to create job');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while creating the job.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                <input 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows={4} 
                    placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                    className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        placeholder="e.g. San Francisco, CA or Remote"
                        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
                    <select 
                        name="jobType" 
                        value={formData.jobType} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    >
                        <option value="FULL_TIME">Full Time</option>
                        <option value="PART_TIME">Part Time</option>
                        <option value="CONTRACT">Contract</option>
                        <option value="REMOTE">Remote</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Salary Min ($)</label>
                    <input 
                        name="salaryMin" 
                        value={formData.salaryMin} 
                        onChange={handleChange} 
                        type="number" 
                        placeholder="50000"
                        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Salary Max ($)</label>
                    <input 
                        name="salaryMax" 
                        value={formData.salaryMax} 
                        onChange={handleChange} 
                        type="number" 
                        placeholder="100000"
                        className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Requirements</label>
                <textarea 
                    name="requirements" 
                    value={formData.requirements} 
                    onChange={handleChange} 
                    rows={3} 
                    placeholder="List the skills, experience, and qualifications required..."
                    className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#3a3a3a] rounded-xl text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" 
                />
            </div>

            <div>
                <button 
                    type="submit"
                    disabled={loading} 
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all font-semibold disabled:opacity-50 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                    {loading ? 'Creating...' : 'Create Job'}
                </button>
            </div>
        </form>
    );
}
