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

    // 지역 입력 상태관리
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
            <br />
            <h1>이미 가입한 회원인 경우</h1>
                <button onClick={() => { location.href = "/" }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">메인 화면으로</button>
            <div>
            </div>
            <br />
            <div className="inputUserInfo" style={{ display: "flex", flexDirection: "column" }}>
                <h1>새로 가입한 회원인 경우</h1>
                <div className="mb-4">
                    <label htmlFor="nickname" className="block text-lg mb-2">닉네임</label>
                    <textarea id="nickname" className="input-field px-4 py-2 border rounded" placeholder="닉네임을 입력하세요" onChange={handleNameChange} required></textarea>
                </div>
                <CheckNickButton nickname={nickname} setValidName={setValidName} />
                <br />
                <br />
                <div className="area">
                    <SelectArea area={area} onAreaChange={handleAreaChange} />
                </div>
            </div>
            <br />
            <div
                className="exportUserBtn"
                style={{ display: "flex", justifyContent: "center" }}
            >
            <ExportUserInfoButton
                nickname={nickname}
                validName={validName}
                area={area}
            />
            </div>
        </div>
    );
}