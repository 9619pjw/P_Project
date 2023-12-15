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

type FollowerUser = {
    userId: number;
    nickname: string;
    profileImage: string | null;
    followed: boolean;
}

export default function FollowerListPage({ params }: { params: PageParams }){

    const [followerList, setFollowerList] = useState<FollowerUser[]>([]);

    useEffect(() => {
        const fetchFollowerList = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`https://funsns.shop:8000/follow-service/followers/${params.id}?cursor=0&size=100`, {
                headers: {
                    Credentials: "include",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.code === "SUCCESS") {
                setFollowerList(data.data);
            } else {
                console.log("팔로워 리스트를 불러오는데 실패했습니다.");
            }
        }

        fetchFollowerList();
    }, [params.id]);

    return (
        <div className="bg-gray-100 flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold mb-4">팔로워 목록</h1>
            {followerList.map(user => (
                <div key={user.userId} className="mr-2 border-bottom">
                    <img src={user.profileImage || "/default-profile.png"} alt="profile" className="rounded-full w-12 h-12"/>
                    <Link href={`/profile/${user.userId}`}>    
                        <p className="text-sm font-semibold">{user.nickname}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}