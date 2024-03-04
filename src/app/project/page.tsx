"use client";
import Head from 'next/head';
import { Link } from "@nextui-org/link";

export default function ProjectPage() {
    return (
        <>
            <Head>
                <title>Crowd Funding Platform</title>
            </Head>
            <div className="bg-gray-100 container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Funs!</h1>
                    <p className="text-lg">SNS형 크라우드 펀딩 서비스</p>
                </header>
                <div className="text-center mb-8">
                    <Link href="/project/list">
                        <a className="px-4 py-2 bg-green-500 text-white rounded mr-2">시작하기</a>
                    </Link>
                </div>
            </div>
        </>
    );
}