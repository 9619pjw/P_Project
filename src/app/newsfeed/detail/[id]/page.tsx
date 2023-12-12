"use client";

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

type ReadProps = {
    params: {
      id: number;
    };
  };

export default function FeedDetailPage(props: ReadProps) {

    const [feedData, setFeedData] = useState<NewsfeedInfo | null>(null);

    console.log(`Component rendered. feedId: ${props.params.id}`); // 컴포넌트 렌더링 확인

    useEffect(() => {
        const fetchFeedDetail = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            console.log(`useEffect triggered. feedId: ${props.params.id}`); // useEffect 실행 확인

            try {
                const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}`, {
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

        fetchFeedDetail();
    }, [props.params.id]);

    if (!feedData) {
        return <div>Loading...</div>;
    }

    console.log('Rendering feed data:', feedData); 

    return (
    <div className="bg-gray-50 flex flex-col items-center p-6">
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-6">
            <h1 className="text-gray-900 font-bold mb-2">{feedData.title}</h1>
            <h2 className="text-sm font-semibold mb-4">작성자: {feedData.nickname}</h2>
            <div className="mb-4">
                <img src={feedData.profileImgURL} alt="Profile" className="rounded-full w-12 h-12 mb-2" />
                <img src={feedData.feedImgURL} alt="Feed" className="w-full h-128 rounded-lg object-cover" />
            </div>
            <p className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: feedData.content.replace(/\n/g, '<br />') }}></p>
            <p className="text-blue-500 border-2 border-blue-500 rounded px-4 py-2">좋아요: {feedData.likeCount}</p>
            <p className="text-blue-500 border-2 border-blue-500 rounded px-4 py-2 mt-2">댓글: {feedData.commentCount}</p>
        </div>
    </div>
    );
}