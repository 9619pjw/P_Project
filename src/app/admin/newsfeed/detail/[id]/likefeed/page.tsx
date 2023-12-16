"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type LikeInfo = {
    cursorId: number;
    userId: number;
    nickname: string;
    profileImgURL: string;
    followed: boolean;
}

type ReadProps = {
    params: {
        id: number;
    };
};


export default function LikeListPage(props: ReadProps) {
    const [likeList, setLikeList] = useState<LikeInfo[]>([]);

    const handleGoBack = (e: React.MouseEvent) => {
        window.location.href = `/admin/newsfeed/detail/${props.params.id}`;
    };
    // 좋아요 리스트 정보 가져옴
    const fetchLikeList = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`https://funsns.shop:8000/feed-service/feed/${props.params.id}/like-list?cursor=0&size=10`, {
                method: "GET",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setLikeList(data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchLikeList();
    }, [props.params.id]);

    if (!likeList) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">좋아요 목록</h1>
            {likeList.map(user => (
                <div key={user.userId} className="flex items-center space-x-4 mr-2 border-bottom">
                    <img src={user.profileImgURL || "/default-profile.png"} alt="profile" className="rounded-full w-12 h-12"/>
                    <Link href={`/profile/${user.userId}`}>    
                        <p className="text-sm font-semibold">{user.nickname}</p>
                    </Link>
                </div>
            ))}
            <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"> 
                뒤로 가기 
            </button>
        </div>
    );            
}