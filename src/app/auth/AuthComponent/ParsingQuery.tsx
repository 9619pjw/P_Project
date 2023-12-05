"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// 리다이렉트 URI에 붙은 쿼리를 파싱하는 컴포넌트
export default function ParsingQuery() {
    const params = useSearchParams();
    const router = useRouter();

    const accessToken: any | null = params.get("accessToken");
    const expiredTime: any | null = params.get("expiredTime");
    const userId: any | null = params.get("userId");
    const isFirstLogin : any | null = params.get("isFirstLogin");


    useEffect(() => {
        const localStorage: Storage = window.localStorage;

        // 쿼리파라미터가 있다면 로컬스토리지에 액세스 토큰 저장
        if (accessToken && expiredTime) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiredTime", expiredTime);
            localStorage.setItem("userId", userId);
        }
    }, []);

        // 최초 로그인의 경우 회원정보 입력해야함.

        useEffect(() => {
            if (isFirstLogin !== 'true') {
                window.location.href = "/";
            }
        }, [isFirstLogin]);


    return (
    <div className="tokenInfo">
    </div>
    );
}
