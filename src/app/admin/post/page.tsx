"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


// api/post로 접속 시, api/post/list로 자동 이동
export default function PostPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/admin/post/list');
    }, []);

    return null;
};

