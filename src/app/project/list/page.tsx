"use client";
import Head from 'next/head';
import { Link } from "@nextui-org/link";

export default function ProjectPage() {
    return (
        <>
            <Head>
                <title>Crowd Funding Platform</title>
            </Head>
            <div className="bg-gray-100 container mx-auto px-4 py-8 flex">
                {/* 사이드 바 */}
                <aside className="w-64 h-screen bg-transparent mr-4">
                    <div className="bg-gray-200 p-4 mb-8 rounded-lg shadow-lg">
                        <Link href="/project/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-full mb-2 block hover:bg-green-600 transition">Create a Project</button>
                        </Link>
                        <Link href="/project/myproject">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-full mb-2 block hover:bg-gray-600 transition">My projects</button>
                        </Link>
                        <Link href="/project/funded">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-full block hover:bg-gray-600 transition">Funded projects</button>
                        </Link>
                    </div>
            </aside>
            <main className="flex-grow">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome to our Crowd Funding Platform!</h1>
                    <p className="text-lg">Help fund amazing projects and make a difference.</p>
                </header>

                <div className="flex justify-center space-x-4 mb-8">
                    <input type="text" placeholder="Search for projects" className="px-4 py-2 border rounded" />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
                </div>
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Projects List</h2>
                    <p className="mb-6 text-gray-600">Discover innovative projects that need your support.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Repeat this block for each project */}
                        <div className="bg-white shadow rounded overflow-hidden">
                            <img src="https://via.placeholder.com/300" alt="Project image" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Project name</h3>
                                <p className="text-gray-600 mb-4">Project description</p>
                                <p className="text-sm mb-2">Period: 3 weeks</p>
                                <p className="text-sm mb-4">Goal: $5k</p>
                                <button className="w-full bg-blue-500 text-white py-2 rounded">Donate</button>
                            </div>
                        </div>
                        {/* End of project block */}
                    </div>
                </section>

                <footer className="flex justify-center mt-8">
                    <nav aria-label="Page navigation">
                        <ul className="flex list-none">
                            <li className="mx-1"><a href="#" className="px-3 py-2 bg-gray-300 rounded">1</a></li>
                            <li className="mx-1"><a href="#" className="px-3 py-2 bg-gray-300 rounded">2</a></li>
                            <li className="mx-1"><a href="#" className="px-3 py-2 bg-gray-300 rounded">3</a></li>
                            <li className="mx-1"><a href="#" className="px-3 py-2 bg-gray-300 rounded">4</a></li>
                        </ul>
                    </nav>
                </footer>
            </main>
            </div>
        </>
    );
}