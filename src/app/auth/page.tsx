"use client";
import ParsingQuery from "@/app/auth/AuthComponent/ParsingQuery";
import Link from "next/link";



export default function SignUp() {

    return(
        <div>
            <h1> 회원 정보를 가져옵니다..</h1>
            <div className="token" style={{ display: "flex", justifyContent: "center" }}>
                <ParsingQuery />
            </div>
            <Link href="/">
                메인 화면으로
            </Link>
        </div>
    );
}