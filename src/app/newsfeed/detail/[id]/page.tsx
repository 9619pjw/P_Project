"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";

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
    commentId : number,      // 댓글 id
    content : string,        // 댓글 내용
    likeCount : number,	     // 좋아요 수
    replyCount : number,	 // 대댓글의 수
    userId : number,		 // 댓글 작성자 id
    profileImgURL : string,  // 댓글 작성자 프로필 이미지
    nickname : string,       // 댓글 작성자 닉네임
    isLiked : boolean,       // 댓글 좋아요 여부
    createdDate : string     // 댓글 생성 날짜
}

type Comment = {
    content : string;
}

type ReadProps = {
    params: {
        id: number;
    };
};

export default function FeedDetailPage(props: ReadProps) {

    const [feedData, setFeedData] = useState<NewsfeedInfo | null>(null);
    const [comments, setComments] = useState<CommentInfo[]>([]); 
    const [commentInput, setCommentInput] = useState('');

    // 피드 좋아요 관리
    const [likeCount, setLikeCount] = useState(feedData ? feedData.likeCount : 0);
    const [isLiked, setIsLiked] = useState(feedData ? (feedData.isLiked ? true : false) : null);


    // feedData가 변경될 때마다 좋아요 상태 업데이트
    useEffect(() => {
        if (feedData) {
            setIsLiked(feedData.isLiked);
        }
    }, [feedData]);

    const handleCommentChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(e.target.value);
    };

    // 좋아요 처리 함수
    const handleLike = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/like`, {
                method : "POST",
                headers: { 
                "Credentials": "include",
                "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    // 좋아요 상태 및 개수 업데이트
                    !isLiked;
                    setLikeCount(likeCount + 1);
                    fetchFeedDetail();
                    window.location.href = `/newsfeed/detail/${props.params.id}`;
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
        console.error('피드 처리 실패:', error);
        }
    };
    // 좋아요 취소 처리 함수
    const handleUnlike = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/like`, {
                method: 'DELETE',
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    // 좋아요 상태 및 개수 업데이트
                    setIsLiked(false);
                    setLikeCount(likeCount - 1);
                    fetchFeedDetail();
                    window.location.href = `/newsfeed/detail/${props.params.id}`;
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
            console.error('피드 좋아요 취소 실패:', error);
        }
    };
    // 피드 삭제 함수
    const deleteFeed = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}`, {
                method: 'DELETE',
                headers: { 
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    alert("피드 삭제가 완료되었습니다.");
                    window.location.href = '/newsfeed';
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
            console.error('피드 삭제 실패:', error);
        }
    };


    // 댓글 함수
    const fetchComments = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/comment?cursor=0&size=10`, {
                method: "GET",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setComments(data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    // 댓글 작성
    const submitComment = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/comment`, {
                method: "POST",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: commentInput
                }),
            });

            const data = await response.json();

            console.log('Comment Post Response:', data); 

            if(data.code === "SUCCESS") {
                alert('댓글 작성이 완료되었습니다.');
                setCommentInput(''); 
                fetchComments();
                fetchFeedDetail();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // 댓글 삭제 함수
    const deleteComment = async (commentId : number) => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/comment/${commentId}`, {
                method: 'DELETE',
                headers: { 
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    alert("댓글 삭제가 완료되었습니다.");
                    fetchFeedDetail();
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
        }
    };

    // 댓글 좋아요 함수
    const likeComment = async (commentId: number) => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/comment/${commentId}/like`, {
                method: 'POST',
                headers: { 
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    alert("댓글 좋아요가 완료되었습니다.");
                    const newComments = [...comments];  // comments 배열 복사
                    const targetComment = newComments.find(comment => comment.commentId === commentId);
                    if (targetComment) {
                        targetComment.isLiked = true;
                        targetComment.likeCount++;
                    }
                    setComments(newComments);
                    fetchFeedDetail();
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
            console.error('댓글 좋아요 실패:', error);
        }
    };

    // 댓글 좋아요 취소 함수
    const unlikeComment = async (commentId: number) => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/comment/${commentId}/like`, {
                method: 'DELETE',
                headers: { 
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            // 응답 처리
            if (response.ok) {
                const result = await response.json();

                if (result.code === 'SUCCESS') {
                    alert("댓글 좋아요 취소가 완료되었습니다.");
                    // 좋아요 상태 및 개수 업데이트
                    const newComments = [...comments];  // comments 배열 복사
                    const targetComment = newComments.find(comment => comment.commentId === commentId);
                    if (targetComment) {
                        targetComment.isLiked = false;
                        targetComment.likeCount--;
                    }
                    setComments(newComments);
                    fetchFeedDetail();
                } else {
                    throw new Error(result.message);
                }
            } else {
                throw new Error('API 요청 실패');
            }
        } catch (error) {
            console.error('댓글 좋아요 취소 실패:', error);
        }
    };

    // 피드 정보 가져옴
    const fetchFeedDetail = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}`, {
                method: "GET",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setFeedData(data.data);
            } catch (error) {
                console.error("Error:", error);
            }
    };

        
    useEffect(() => {
        fetchFeedDetail();
        fetchComments(); 
    }, [props.params.id]);


    if (!feedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-50 flex justify-center p-12">
            <div className="bg-white shadow-md rounded-lg w-full max-w-6xl flex">
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
                        {feedData.isMine && 
                            <button onClick={deleteFeed} className="px-4 py-2 bg-red-500 text-white rounded">
                                피드 삭제
                            </button>
                        }
                    </div>
                    <div className="mb-4">
                        <p className="text-gray-900 font-bold">{feedData.title}</p>
                        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: feedData.content.replace(/\n/g, '<br />') }}></p>
                    </div>
                <div className="mb-4 flex space-x-2 py-4 border-b">
                {feedData.isLiked ? (
                    <button onClick={handleUnlike} className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        좋아요 취소 : {feedData.likeCount}
                    </button> 
                ):(
                    <button onClick={handleLike} className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        좋아요 : {feedData.likeCount}
                    </button>
                )}
                    <button className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        댓글 : {feedData.commentCount}
                    </button>
                </div>
                <div className="comments-section">
                    {comments.map(comment => (
                        <div key={comment.commentId} className="className=flex items-center mb-4">
                            <div className="mr-2">
                                <img src={comment.profileImgURL} alt="User Avatar" className="rounded-full w-12 h-12" />            
                            </div>
                            <div>
                                <Link href={`/profile/${feedData.userId}`}>    
                                    <p className="text-sm font-semibold">{comment.nickname}</p>
                                </Link>
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
                                <p className="text-gray-700"  dangerouslySetInnerHTML={{ __html: comment.content.replace(/\n/g, '<br />') }}></p>
                            </div>
                                {comment.isLiked ? (
                                    <button onClick={() => unlikeComment(comment.commentId)} className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        좋아요 취소 : {comment.likeCount}
                                    </button>
                                ) : (
                                    <button onClick={() => likeComment(comment.commentId)} className="px-4 py-2 bg-white text-blue-500 border-2 border-blue-500 rounded flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        좋아요 : {comment.likeCount}
                                    </button>
                                )}
                                {comment.userId === parseInt(localStorage.getItem("userId") || "0", 10) && 
                                    <button onClick={() => deleteComment(comment.commentId)} className="px-4 py-2 bg-red-500 text-white rounded">
                                        댓글 삭제   
                                    </button>
                                }
                        </div>    
                        )
                    )
                }
                </div>
                <div className="comment-input-section">
                    <input 
                        type="text" 
                        value={commentInput} 
                        onChange={handleCommentChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                        placeholder="댓글을 작성해주세요." 
                    />
                    <br />
                    <button onClick={submitComment} className="border border-gray-300 bg-grey-500 text-black px-2 py-1 rounded-md cursor-pointer">댓글 작성</button>
                </div>
            </div>
        </div>
    </div>
    );
}