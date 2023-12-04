"use client";

import Image from 'next/image';
import Link from "next/link";




export default function LogoutButton(){

    // TODO: 로그아웃 POST 요청 구현하기
    async function logout() {
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    const logoutAPI: string =
        "https://funsns.shop:8000/user-service/auth/logout";
    const response = await fetch(logoutAPI, {
        method: "POST",
        headers: {
            Credentials: "include",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        if (res.status === 200) {
            // 액세스 토큰 삭제
            localStorage.removeItem("accessToken");
            localStorage.removeItem("expiredTime");
            localStorage.removeItem("userId");

            alert("로그아웃 되었습니다.");
            window.location.href = "/";
        } 
        // TODO: 401 에러 처리
        // 액세스 토큰이 있지만 리프레쉬 토큰이 만료된 경우
        else if(res.status === 401){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("expiredTime");
            localStorage.removeItem("userId");
            alert("다시 로그인 해주세요.");
            location.reload();
        }
        else{
            localStorage.removeItem("accessToken");
            localStorage.removeItem("expiredTime");
            localStorage.removeItem("userId");
            location.reload();
        }}
        ).catch((err) => {
            console.log(err);
        }); 
    }
    return (
        <div className="logoutNaver">
            <button onClick={logout}>
                <img src="/logout.png" alt="Logout" width={128} height={128}/>
            </button>
        </div>
    );
}