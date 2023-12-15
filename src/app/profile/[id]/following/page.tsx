"use client";
import { useState, useEffect } from "react";
import ModalCustom from "@/components/ModalCustom";
import CheckNickButton from "@/app/auth/AuthComponent/CheckNickButton";
import InsertProfileImage from "../profileComponent/InsertProfileImage";
import ShowSearchList from "../profileComponent/ShowSearchList";
import IsYours from "../profileComponent/IsYours";


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

type ProfileProps = {
    userJSON: UserJSON;
};

type FollowingUser = {
    userId: number;
    nickname: string;
    profileImage: string | null;
    followed: boolean;
}

export default function FollowingListPage({ userJSON }: ProfileProps){

    const [followingList, setFollowingList] = useState<FollowingUser[]>([]);

    useEffect(() => {
        const fetchFollowingList = async () => {
            const localStorage: Storage = window.localStorage;
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`https://funsns.shop:8000/follow-service/followings/${userJSON.userId}?cursor=0&size=100`, {
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
    }, [userJSON.userId]);

    return (
        <div>
            <h1>팔로잉 목록</h1>
            {followingList.map(user => (
                <div key={user.userId}>
                    <img src={user.profileImage || "/default-profile.png"} alt="profile" />
                    <h2>{user.nickname}</h2>
                </div>
            ))}
        </div>
    );

}