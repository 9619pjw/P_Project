"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserJSON = {
	userId: number;
	name : string;
	nickname: string;
	introduction: string | null;
	profileImage: string | null | undefined;
};

type PageParams = {
    id: number;
};

type feedInfo = {
    gifticonId ?: number; // 기프티콘 id
    image: string | null; // 기프티콘 이미지 추가
    categoryName: string; // 카테고리 이름
    gifticonName: string; // 상품명
    description: string; // 설명
    price: number; // 가격
    amount: number; // 수량
};

export default function NewsfeedCreatePage(){



    return (
        <>
        </>
    );



}