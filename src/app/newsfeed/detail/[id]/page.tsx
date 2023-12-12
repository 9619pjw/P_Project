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

    console.log('Rendering feed data:', feedData); // 렌더링 데이터 확인

    return (
        <div>
             <h1>{feedData.title}</h1>
            <h2>작성자: {feedData.nickname}</h2>
            <img src={feedData.profileImgURL} alt="Profile" />
            <img src={feedData.feedImgURL} alt="Feed" />
            <p>{feedData.content}</p>
            <p>좋아요: {feedData.likeCount}</p>
            <p>댓글: {feedData.commentCount}</p>
        </div>
    );
}