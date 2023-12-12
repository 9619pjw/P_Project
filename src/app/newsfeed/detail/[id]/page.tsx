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


export default function FeedDetailPage(){    
    const router = useRouter();
    const params = useSearchParams();
    const feedId  = params.get('feedId');

    const [feedData, setFeedData] = useState<NewsfeedInfo | null>(null);
    
    useEffect(() => {
        const fetchFeedDetail = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");
            
            try{
                const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${feedId}`, 
                {
                    method: "GET",
                    headers: {
                        "Credentials": "include",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setFeedData(data.data);
            } catch (error) {
                console.error("Error:", error);
            }
    };
        if(feedId){
            fetchFeedDetail();
        }
    }, [feedId]);
    
    if (!feedData) {
        return <div>Loading...</div>;
    }

    return(
        <div>
        
        </div>
    );
}