"use client";
import { useState, useEffect } from "react";
type PageParams = {
  pageId: number;
  isYou: boolean;
  setIsYou: any;
};

// 본인인지 확인하는 컴포넌트
export default function IsYours({ pageId, isYou, setIsYou }: PageParams) {
  // 부모 컴포넌트에 있어야할 것
  // 본인 프로필인지 확인
  //   const [isYourProfile, setIsYourProfile] = useState(false);

  useEffect(() => {
    // 로컬스토리지 토큰 가져오기
    const localStorage = window.localStorage;
    const userId = localStorage.getItem("userId");

    if (userId === pageId.toString()) {
      setIsYou(true);
    }
  }, []);

  return null;
}
