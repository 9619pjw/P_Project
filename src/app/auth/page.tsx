"use client";

import ParsingQuery from "@/app/auth/AuthComponent/ParsingQuery";
import CheckNickButton from "./AuthComponent/CheckNickButton";
import ExportUserInfoButton from "./AuthComponent/ExportUserInfoButton";
import SelectArea from "./AuthComponent/SelectArea";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function SignUp() {

     // 닉네임 입력 상태관리
    const [nickname, setNickname] = useState("");
    const handleNameChange = (event: any) => {
        setNickname(event.target.value);
    };

    // 닉네임 중복 상태관리
    const [validName, setValidName] = useState(false);

    // 지역 입력 상태관리 <= 삭제 예정
    const [area, setArea] = useState("");
    const handleAreaChange = (event: string) => {
        setArea(event);
    };

    return(
        <div>
            <h1>FUNS! CrowdFunding Service</h1>
            <div className="token" style={{ display: "flex", justifyContent: "center" }}>
                <ParsingQuery />
            </div>
        </div>
    );
}