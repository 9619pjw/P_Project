"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

type Newsfeed = {
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
    createdDate: string;
};

export default function FeedDetailPage(){    
    
    const router = useRouter();
    const { feedId } = router.query;

    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const [feedData, setFeedData] = useState<Newsfeed | null>(null);
    
    useEffect(() => {
        if (router.isReady) {
            const fetchFeedDetail = async () => {
                const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${feedId}`, {
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.code === "SUCCESS") {
                setFeedData(data.data);
            }
        };
            
            fetchFeedDetail();
        }
    }, [feedId, router.isReady]);
    
    if (!feedData) {
        return <div>Loading...</div>;
    }

    return(
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