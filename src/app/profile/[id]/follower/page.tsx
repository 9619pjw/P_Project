"use client";
import { useState } from "react";
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

export default function FollowerListPage(){

    // console.log("userJSON:");
    // console.log(userJSON);
    // let userData = userJSON;

    return <>팔로워 목록</>

}