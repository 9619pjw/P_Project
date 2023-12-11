"use client";

import { QueryClient, QueryClientProvider, useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

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

type NewsfeedComponentProps = {
    loadData: boolean;
    fetchNewsfeeds: (context: QueryFunctionContext) => Promise<{ newsfeeds: Newsfeed[]; nextCursor: number }>;
    token: string | null;
};

export default function NewsfeedPage(){
    const [token, setToken] = useState<string | null>(null);
    const [loadData, setLoadData] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("accessToken"));
        setLoadData(true); 
    }, []);

    const fetchNewsfeeds = async ({ pageParam = 0 }: QueryFunctionContext) => {
        const response = await fetch(`https://funsns.shop:8000/feed-service/feed/newsfeed?cursor=${pageParam}&size=5`, {
        headers: {
            "Credentials": "include",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    
    return { newsfeeds: data.data, nextCursor: data.data[data.data.length - 1].feedId };
    };

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <NewsfeedComponent loadData={loadData} fetchNewsfeeds={fetchNewsfeeds} token={token}/>
        </QueryClientProvider>
    );
}

function NewsfeedComponent({loadData, fetchNewsfeeds, token} : NewsfeedComponentProps) {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery('newsfeeds', fetchNewsfeeds, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!token && loadData, 
    });

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, fetchNextPage]);
    
    return (
        <div>
            <Link href="/newsfeed/create">
                <button className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
                    피드 생성
                </button>
            </Link>
            {data?.pages.flatMap((group, i) => (
            <React.Fragment key={i}>
                {group.newsfeeds.map((newsfeed : Newsfeed) => (
                <div key={newsfeed.feedId} className="bg-gray-50 flex justify-center p-6">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="mr-2">
                                    <img src={newsfeed.profileImgURL} alt="User Avatar" className="rounded-full w-12 h-12" />
                                </div>
                            <div>
                            <p className="text-sm font-semibold">{newsfeed.nickname}</p>
                            <p className="text-xs text-gray-500">게시일 : {newsfeed.createdDate}</p>
                        </div>
                    </div>
                <div className="mb-4 flex justify-center">
                    <img src={newsfeed.feedImgURL} alt="Project Image" className="w-auto h-auto rounded-lg" />
                </div>
                <div className="mb-4 w-128 h-64 overflow-auto text-center">
                    <p className="text-gray-900 font-bold">{newsfeed.title}</p>
                    <p className="text-gray-700">{newsfeed.content}</p>
                </div>
                <div className="mb-4 flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Like</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Comment</button>
                </div>
            </div>
        </div>
    </div>
    ))}
    </React.Fragment>
    ))}
    <div ref={ref} />
</div>
);
}