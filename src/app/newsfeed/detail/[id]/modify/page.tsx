"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


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

type ReadProps = {
    params: {
        id: number;
    };
};


export default function LikeListPage(props: ReadProps) {

    const handleGoBack = (e: React.MouseEvent) => {
        window.location.href = `/newsfeed/detail/${props.params.id}`;
    };


    return(
        <div>


            <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"> 
                뒤로 가기 
            </button>
        </div>
    );

}