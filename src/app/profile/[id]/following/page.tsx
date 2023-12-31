"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type UserJSON = {
    userId: number;
    name : string;
    nickname: string;
    profileImage: string | null | undefined;
    introduction: string | null;
    availableFollow : boolean;
    followerCount : number;
    followingCount : number;
    userType : string;
};

type PageParams = {
    id: number;
};

type FollowingUser = {
    userId: number;
    nickname: string;
    profileImage: string | null;
    followed: boolean;
}

export default function FollowingListPage({ params }: { params: PageParams }){

    const [followingList, setFollowingList] = useState<FollowingUser[]>([]);

    const handleGoBack = (e: React.MouseEvent) => {
        window.location.href = "/profile";
    };

    useEffect(() => {
        const fetchFollowingList = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`https://funsns.shop:8000/follow-service/followings/${params.id}?cursor=0&size=100`, {
                headers: {
                    Credentials: "include",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.code === "SUCCESS") {
                setFollowingList(data.data);
            } else {
                console.log("팔로잉 리스트를 불러오는데 실패했습니다.");
            }
        }

        fetchFollowingList();
    }, [params.id]);

    return (
        <div className="bg-gray-100 flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold mb-4">팔로잉 목록</h1>
            {followingList.length === 0 ? (
            <p>회원님이 팔로잉하는 모든 사람들이 표시됩니다</p>
            ) : (
                followingList.map(user => (
                    <div key={user.userId} className="flex items-center space-x-4 mr-2 border-bottom">
                        <img src={user.profileImage || "/default-profile.png"} alt="profile" className="rounded-full w-12 h-12"/>
                        <Link href={`/profile/${user.userId}`}>    
                            <p className="text-sm font-semibold">{user.nickname}</p>
                        </Link>
                    </div>
                ))
            )}
            <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"> 
                뒤로 가기 
            </button>
        </div>
    );
}