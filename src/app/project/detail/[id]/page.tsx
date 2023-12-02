import Head from 'next/head';

export default function ProjectDetailPage() {
    return (
        <>
            <Head>
                <title>Project Details</title>
            </Head>
            <div className="bg-gray-50 container mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-2">Project Name</h1>
                        <div className="flex items-center mb-4">
                            <div className="mr-2">
                                <img src="https://unsplash.it/32/32" alt="User Avatar" className="rounded-full" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">JokerBEAR</p>
                                <p className="text-xs text-gray-500">2023/12/03</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <img src="https://unsplash.it/600/300" alt="Project Image" className="w-full h-auto rounded-lg" />
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700">My portfolio is dying... I dont want to front-end...</p>
                            <p className="text-sm text-gray-500">Period: 2023/12/01 ~ 2023/12/23</p>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Goals: 5Ether (50%)</h2>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Donate!
                                </button>
                            </div>
                            <div className="progress-bar mt-2 h-4 bg-gray-300 rounded overflow-hidden">
                                <div className="progress-bar-inner h-full bg-blue-500 transition-all duration-500" style={{ width: '50%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}