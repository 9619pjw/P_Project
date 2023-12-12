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

type CommentInfo = {
    commentId : number,        // 댓글 id
    content : string,  // 댓글 내용
    likeCount : number,	   // 좋아요 수
    replyCount : number,	   // 대댓글의 수
    userId : number,		  // 댓글 작성자 id
    profileImgURL : string, // 댓글 작성자 프로필 이미지
    nickname : string,  // 댓글 작성자 닉네임
    isLiked : boolean,    // 댓글 좋아요 여부
    createdDate : string // 댓글 생성 날짜
}

type ReadProps = {
    params: {
        id: number;
    };
};

export default function FeedDetailPage(props: ReadProps) {

    const [feedData, setFeedData] = useState<NewsfeedInfo | null>(null);
    const [comments, setComments] = useState<CommentInfo[]>([]); 

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


        // 댓글 데이터를 가져오는 함수 추가
        const fetchComments = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            try {
                const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/comment?cursor=0&size=1`, {
                    method: "GET",
                    headers: {
                        "Credentials": "include",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                console.log('Comment Response:', data); // API 호출 응답 값 확인

                setComments(data.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchFeedDetail();
        fetchComments(); 
    }, [props.params.id]);

    if (!feedData) {
        return <div>Loading...</div>;
    }

    console.log('Rendering feed data:', feedData); 

    return (
        <div className="bg-gray-50 flex justify-center p-12">
            <div className="bg-white shadow-md rounded-lg w-full max-w-2xl flex">
                <div className="w-1/2 h-256">
                    <Link href={`/newsfeed/detail/${feedData.feedId}`}>
                        <img src={feedData.feedImgURL} alt="Project Image" className="w-full h-full object-cover" />
                    </Link>
                </div>
                <div className="w-1/2 p-6">
                    <div className="flex items-center mb-4">
                        <div className="mr-2">
                            <img src={feedData.profileImgURL} alt="User Avatar" className="rounded-full w-12 h-12" />            
                        </div>
                    <div>
                    <Link href={`/profile/${feedData.userId}`}>    
                        <p className="text-sm font-semibold">{feedData.nickname}</p>
                    </Link>
                    <p className="text-xs text-gray-500">
                        게시일 : {
                            new Date(feedData.createdDate).toLocaleDateString('ko-KR', {
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
                    <p className="text-gray-900 font-bold">{feedData.title}</p>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: feedData.content.replace(/\n/g, '<br />') }}></p>
            </div>
            <div className="mb-4 flex space-x-2">
                <button className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Like : {feedData.likeCount}
                </button>
                <button className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg>
                    Comment : {feedData.commentCount}
                </button>
            </div>
            <div className="comments-section">
            {comments.map(comment => (
                <div key={comment.commentId} className="comment">
                    <img src={comment.profileImgURL} alt="User Avatar" className="rounded-full w-12 h-12" />            
                    <div>
                        <p className="text-sm font-semibold">{comment.nickname}</p>
                        <p className="text-xs text-gray-500">
                            작성일 : {
                                new Date(comment.createdDate).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                            }                                             
                        </p>
                        <p className="text-gray-700">{comment.content}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
    );
}