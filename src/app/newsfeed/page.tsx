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


    //*** add dummy data ***//
    const fetchNewsfeeds = async ({ pageParam = 0 }: QueryFunctionContext) => {
        const dummyData: Newsfeed[] = [
            {
                feedId: 1,
                userId: 101,
                nickname: "홍길동",
                title: "첫 번째 피드",
                content: "안녕하세요! 첫 번째 피드를 작성합니다.",
                profileImgURL: "https://example.com/profile/101.jpg",
                feedImgURL: "https://example.com/feed/1.jpg",
                likeCount: 15,
                commentCount: 3,
                isLiked: true,
                createdDate: "2024-09-09T10:15:30"
            },
            {
                feedId: 2,
                userId: 102,
                nickname: "김철수",
                title: "여행 사진",
                content: "이번 여름에 다녀온 여행 사진입니다!",
                profileImgURL: "https://example.com/profile/102.jpg",
                feedImgURL: "https://example.com/feed/2.jpg",
                likeCount: 25,
                commentCount: 5,
                isLiked: false,
                createdDate: "2024-09-08T14:20:45"
            },
            {
                feedId: 3,
                userId: 103,
                nickname: "이영희",
                title: "맛있는 저녁",
                content: "오늘 저녁은 정말 맛있었어요!",
                profileImgURL: "https://example.com/profile/103.jpg",
                feedImgURL: "https://example.com/feed/3.jpg",
                likeCount: 10,
                commentCount: 1,
                isLiked: true,
                createdDate: "2024-09-07T18:05:10"
            },
            {
                feedId: 4,
                userId: 104,
                nickname: "박민수",
                title: "운동 일지",
                content: "오늘은 5km 달렸습니다!",
                profileImgURL: "https://example.com/profile/104.jpg",
                feedImgURL: "https://example.com/feed/4.jpg",
                likeCount: 8,
                commentCount: 2,
                isLiked: false,
                createdDate: "2024-09-06T12:30:00"
            },
            {
                feedId: 5,
                userId: 105,
                nickname: "최지우",
                title: "주말 계획",
                content: "이번 주말에는 친구들과 나들이 계획이에요!",
                profileImgURL: "https://example.com/profile/105.jpg",
                feedImgURL: "https://example.com/feed/5.jpg",
                likeCount: 30,
                commentCount: 8,
                isLiked: true,
                createdDate: "2024-09-05T09:00:00"
            }
        ];
    // 페이지 매개변수에 따라 더미 데이터를 리턴
    const pageSize = 5; // 페이지당 데이터 수
    const startIndex = pageParam * pageSize;
    const newsfeeds = dummyData.slice(startIndex, startIndex + pageSize);

    // 가져온 뉴스피드와 다음 페이지 커서 반환
    return { newsfeeds, nextCursor: newsfeeds.length > 0 ? pageParam + 1 : undefined };


    };

    //**********************//
/*
    // fetch 뉴스피드
    const fetchNewsfeeds = async ({ pageParam = 0 }: QueryFunctionContext) => {
        const response = await fetch(`https://funsns.shop:8000/feed-service/feed/newsfeed?cursor=${pageParam}&size=5`, {
        headers: {
            "Credentials": "include",
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await response.json();
    
     // 가져온 뉴스피드와 다음 페이지 커서 반환
    return { newsfeeds: data.data, nextCursor: data.data[data.data.length - 1].feedId };
*/
    

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