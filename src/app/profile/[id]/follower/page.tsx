"use client";
import { useState } from "react";
import ModalCustom from "@/components/ModalCustom";
import CheckNickButton from "@/app/auth/AuthComponent/CheckNickButton";
import InsertProfileImage from "./InsertProfileImage";
import ShowSearchList from "./ShowSearchList";
import IsYours from "./IsYours";


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

export default function FollowerListPage({ userJSON }: ProfileProps){

    console.log("userJSON:");
    console.log(userJSON);
    let userData = userJSON;

    return <>팔로워 목록</>

}