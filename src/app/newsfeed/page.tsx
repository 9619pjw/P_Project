"use client";

import { QueryClient, QueryClientProvider, useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

// 뉴스피드의 타입을 정의
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

// NewsfeedComponent의 props의 타입 정의
type NewsfeedComponentProps = { 
    loadData: boolean;
    fetchNewsfeeds: (context: QueryFunctionContext) => Promise<{ newsfeeds: Newsfeed[]; nextCursor: number }>;
    token: string | null;
};

export default function NewsfeedPage(){
    const [token, setToken] = useState<string | null>(null);
    const [loadData, setLoadData] = useState(false); // 데이터 로드 상태

    useEffect(() => {
        setToken(localStorage.getItem("accessToken")); 
        setLoadData(true); // 데이터 로드 상태 true로 설정
    }, []);

    // 더미 데이터 추가
    const dummyData = {
        data: [
        {
            feedId: 1,
            userId: 1,
            nickname: "농담곰",
            title: "첫 번째 뉴스피드",
            content: "안녕하세요. 첫 번째 뉴스피드입니다.",
            profileImgURL: "https://dummyimage.com/100x100",
            feedImgURL: "https://dummyimage.com/200x200",
            likeCount: 10,
            commentCount: 2,
            isLiked: false,
            createdDate: "2024-03-04T00:00:00Z",
        },
        
        ],
        // 다음 페이지의 커서. 실제로는 마지막 뉴스피드의 ID를 사용하겠지만, 더미 데이터에서는 임의로 설정합니다.
        nextCursor: 2,
    };
    // fetch 뉴스피드
    const fetchNewsfeeds = async ({ pageParam = 0 }: QueryFunctionContext) => {
    //     const response = await fetch(`https://funsns.shop:8000/feed-service/feed/newsfeed?cursor=${pageParam}&size=5`, {
    //     headers: {
    //         "Credentials": "include",
    //         "Authorization": `Bearer ${token}`,
    //     },
    // });
    // const data = await response.json();
    
    //  // 가져온 뉴스피드와 다음 페이지 커서 반환
    // return { newsfeeds: data.data, nextCursor: data.data[data.data.length - 1].feedId };
    
    // 실제 네트워크 요청 대신 더미 데이터를 반환
    return dummyData;

    };

    // QueryClient를 생성 ... NewsfeedComponent 렌더링
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
    } = useInfiniteQuery('newsfeeds', fetchNewsfeeds, { // 무한 스크롤을 위해 useInfiniteQuery를 사용.. 뉴스피드를 가져오는 함수와 토큰이 유효하고 데이터를 로드해야 할 때만 쿼리를 활성화
        getNextPageParam: (lastPage) => lastPage.nextCursor, // 다음 페이지의 커서를 반환하는 함수를 정의합니다.
        enabled: !!token && loadData, 
    });

    const { ref, inView } = useInView({ // useInView를 사용하여 ref와 inView를 가져옴
        threshold: 1, // threshold가 1이므로, 대상 요소가 화면에 완전히 나타났을 때 inView가 true
    });

    useEffect(() => { // 대상 요소가 화면에 나타나고, 다음 페이지가 있고, 현재 뉴스피드를 가져오고 있지 않을 때 다음 페이지를 가져옴
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, fetchNextPage]);
    
    return (
        <div>
            {data?.pages.flatMap((group, i) => (
            <React.Fragment key={i}>
                {group.newsfeeds.map((newsfeed : Newsfeed) => (
                <div key={newsfeed.feedId} className="bg-gray-50 flex justify-center p-6">
                    <div className="bg-white shadow-md rounded-lg w-full max-w-lg">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="mr-2">
                                    <img src={newsfeed.profileImgURL} alt="User Avatar" className="rounded-full w-12 h-12" />            
                                </div>
                            <div>
                                <Link href={`/profile/${newsfeed.userId}`}>    
                                    <p className="text-sm font-semibold">{newsfeed.nickname}</p>
                                </Link>
                                <p className="text-xs text-gray-500">
                                    게시일 : {
                                                new Date(newsfeed.createdDate).toLocaleDateString('ko-KR', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                        }                                             
                                </p>
                            </div>
                        </div>
                    <div className="mb-4">
                        <Link href={`/newsfeed/detail/${newsfeed.feedId}`}>
                            <img src={newsfeed.feedImgURL} alt="Project Image" className="w-full h-128 rounded-lg object-cover" />
                        </Link>
                    </div>
                    <div className="mb-4">
                            <p className="text-gray-900 font-bold">{newsfeed.title}</p>
                            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: newsfeed.content.replace(/\n/g, '<br />') }}></p>
                    </div>
                    <div className="mb-4 flex space-x-2">
                        <button className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            좋아요 : {newsfeed.likeCount}
                        </button>
                        <button className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                            댓글 : {newsfeed.commentCount}
                        </button>
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