"use client";

import Head from 'next/head';

export default function CreateProject() {
    return (
        <>
            <Head>
                <title>Create a Project</title>
            </Head>
            <div className="bg-gray-50 container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Create a Project</h1>
                    <p className="mb-8">Bring your ideas to life with crowd funding.</p>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="projectImage" className="block text-lg mb-2">Project Image</label>
                            <input type="file" id="projectImage" className="input-field w-full px-4 py-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectName" className="block text-lg mb-2">Project Name</label>
                            <input type="text" id="projectName" className="input-field w-full px-4 py-2 border rounded" placeholder="Enter project name" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectDescription" className="block text-lg mb-2">Project Description (max 500 characters)</label>
                            <textarea id="projectDescription" className="input-field w-full px-4 py-2 border rounded" placeholder="Enter project description"></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="projectPeriod" className="block text-lg mb-2">Project Period</label>
                            <input type="text" id="projectPeriod" className="input-field w-full px-4 py-2 border rounded" placeholder="Enter project period" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="fundingGoal" className="block text-lg mb-2">Funding Goal</label>
                            <input type="number" id="fundingGoal" className="input-field w-full px-4 py-2 border rounded" placeholder="Enter funding goal" min="1000" required />
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Project</button>
                            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded" onClick={() => window.history.back()}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}