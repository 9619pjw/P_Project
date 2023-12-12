"use client";

import { QueryClient, QueryClientProvider, useInfiniteQuery, QueryFunctionContext } from 'react-query';
import { useInView } from 'react-intersection-observer';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
type Newsfeed = {
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
    createdDate: string;
};

type NewsfeedComponentProps = {
    loadData: boolean;
    fetchNewsfeeds: (context: QueryFunctionContext) => Promise<{ newsfeeds: Newsfeed[]; nextCursor: number }>;
    token: string | null;
};

type ReadProps = {
    params: {
        feedId: number;
    };
};

export default function feedDetailPage(props: ReadProps){

    return(
        <>
            상세페이지
        </>
    );
}