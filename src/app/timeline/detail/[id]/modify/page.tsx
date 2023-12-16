"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

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

type UserJSON = {
    userId: number;
    name : string;
    nickname: string;
    introduction: string | null;
    profileImage: string | null | undefined;
    availableFollow : boolean;
    followerCount : number;
    followingCount : number;
    userType : string;
};

type FeedInfo = {
    userId : number;
    image: string | File | null;
    title: string;
    content: string;
};

type ReadProps = {
    params: {
        id: number;
    };
};


export default function FeedModifyPage(props: ReadProps) {


    const router = useRouter();
    const [feed, setFeed] = useState<FeedInfo>({
        userId: 0,
        image: null,
        title: "",
        content: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFeed({ ...feed, image: file });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!feed.title || !feed.content) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken"); 

        try {
            const formData = new FormData();

            let CreateFeedRequest = {
                title: feed.title,
                content: feed.content,
            };

            formData.append(
                "content",
                new Blob([JSON.stringify(CreateFeedRequest)], {
                    type: "application/json",
                })
            );

            if (feed.image) {
                formData.append("image", feed.image);
            }

            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}`, {
                method: "PUT",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (data.code === "SUCCESS") {
                alert(data.message);
                router.push(`/timeline/detail/${props.params.id}`);
            } else {
                alert("피드 수정에 실패하였습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleGoBack = (e: React.MouseEvent) => {
        window.location.href = `/timeline/detail/${props.params.id}`;
    };


    return(
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="userId" value={feed.userId} />
                <label className="block">
                    <span className="text-gray-700">이미지:</span>
                    <input type="file" name="image" onChange={handleImageChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                </label>
                <label className="block">
                    <span className="text-gray-700">제목:</span>
                    <input type="text" name="title" value={feed.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </label>
                <label className="block">
                    <span className="text-gray-700">내용:</span>
                    <textarea name="content" value={feed.content} onChange={handleChange} className="mt-1 block w-full h-20 rounded-md border-gray-300 shadow-sm"/>
                </label>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mb-8">피드 수정</button>
            </form>


            <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"> 
                뒤로 가기 
            </button>
        </div>
    );

}