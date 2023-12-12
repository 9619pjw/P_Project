"use client";

import { QueryClient, QueryClientProvider, useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter , useSearchParams } from 'next/navigation';



type NewsfeedInfo = {
    feedId: number;
    userId: number;
    nickname: string;
    title: string;
    content: string;
    profileImgURL: string;
    feedImgURL: string;
    likeCount: number;
    commentCount: number;
    isLiked: boolean;
    isMine: boolean;
    isFollowed : boolean;
    createdDate : string;
    viewCount: number;
}

export default function FeedDetailPage() {
    const router = useRouter();
    const params = useSearchParams();
    const feedId  = params.get('feedId');

    console.log(feedId);
    const [feedData, setFeedData] = useState<NewsfeedInfo | null>(null);

    console.log(`Component rendered. feedId: ${feedId}`); // 컴포넌트 렌더링 확인

    useEffect(() => {
        const fetchFeedDetail = async () => {
            const token = localStorage.getItem("accessToken");

            console.log(`useEffect triggered. feedId: ${feedId}`); // useEffect 실행 확인

            try {
                const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${feedId}`, {
                    method: "GET",
                    headers: {
                        "Credentials": "include",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                console.log('Response:', data); // API 호출 응답 값 확인

                setFeedData(data.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (feedId) {
            fetchFeedDetail();
        }
    }, [feedId]);

    if (!feedData) {
        return <div>Loading...</div>;
    }

    console.log('Rendering feed data:', feedData); // 렌더링 데이터 확인

    return (
        <div>
            {/* 화면 출력 코드 작성 */}
        </div>
    );
}