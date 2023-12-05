"use client";
import { useEffect } from "react";

// 자신의 userId에 맞는 /user/profile/:userId 페이지로 이동하기
export default function ProfilePage() {
  useEffect(() => {
    const localStorage = window.localStorage;
    const userId = localStorage.getItem("userId");
    location.href = `/profile/${userId}`;
  }, []);

 

  return (
    <div>
      <h3>프로필 정보를 불러오고 있습니다. 잠시만 기다려 주십시오...</h3>
    </div>
  );
}