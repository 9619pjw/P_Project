"use client";
import Head from 'next/head';
import { Link } from "@nextui-org/link";

export default function FundedProjectPage() {
    return (
        <>
            <Head>
                <title>Crowd Funding Platform</title>
            </Head>
            <div className="bg-gray-100 container mx-auto px-4 py-8 flex">
                {/* 사이드 바 */}
                <aside className="w-64 h-screen bg-transparent mr-4 sticky top-40" style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    <div className="bg-gray-200 p-4 mb-8 rounded-lg shadow-lg">
                        {/* TODO : 메타마스크 계정 정보 출력 */}
                        <Link href="/project/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-full mb-2 block hover:bg-green-600 transition">Create a Project</button>
                        </Link>
                        <Link href="/project/myproject">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-full mb-2 block hover:bg-gray-600 transition">My projects</button>
                        </Link>
                        <Link href="/project/list">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-full block hover:bg-gray-600 transition">Project List</button>
                        </Link>
                    </div>
                </aside>
            <main className="flex-grow">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome to our Crowd Funding Platform!</h1>
                    <p className="text-lg">후원 진행 중 프로젝트</p>
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
                            <img src="/match.png" alt="Project image" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">WithSports</h3>
                                <p className="text-gray-600 mb-4">스포츠 매칭 서비스</p>
                                <p className="text-sm mb-2">기간: 3개월</p>
                                <p className="text-sm mb-4">달성 목표액: 500 Ether</p>
                                <div className="progress-bar mt-2 h-4 bg-gray-300 rounded overflow-hidden">
                                    <div className="progress-bar-inner h-full bg-blue-500 transition-all duration-500" style={{ width: '50%' }}></div>
                                </div>
                                <br />
                                <button onClick={()=>{location.href="/project/detail/1"}} className="w-full bg-blue-500 text-white py-2 rounded">Donate</button>
                                
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