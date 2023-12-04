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

    useEffect(() => {
        const localStorage: Storage = window.localStorage;

        // 쿼리파라미터가 있다면 로컬스토리지에 액세스 토큰 저장
        if (accessToken && expiredTime) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiredTime", expiredTime);
            localStorage.setItem("userId", userId);
        }

        // 브라우저에서 쿼리파라미터 안 보이게 한다.
        router.replace('/auth', undefined);
        router.refresh();

        // 데이터를 저장한 후 "/"로 리다이렉트합니다.
        // 여기서 새로고침해야 재렌더링되며 로그인 상태가 반영됩니다.
        // window.location.href = "/";

        // 이거 쓰면 새로고침이 아니라서 로그인 상태로 안 바뀜
        // router.push('/');
        }, []);

    return (
    <div className="tokenInfo">
    </div>
    );
}
