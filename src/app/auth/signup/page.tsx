"use client";

import CheckNickButton from "../AuthComponent/CheckNickButton";
import ExportUserInfoButton from "../AuthComponent/ExportUserInfoButton";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function SignUpPage() {

     // 닉네임 입력 상태관리
    const [nickname, setNickname] = useState("");
    const handleNameChange = (event: any) => {
        setNickname(event.target.value);
    };

    // 닉네임 중복 상태관리
    const [validName, setValidName] = useState(false);

    // 이미지 파일 상태관리
    const [image, setImage] = useState(null);
    const handleImageChange = (event: any) => {
        setImage(event.target.files[0]);
    };

    // 소개 입력 상태관리
    const [introduction, setIntroduction] = useState("");
    const handleIntroChange = (event: any) => {
        setIntroduction(event.target.value);
    };

    // TODO : userType 지정 (후원자가 기본값, 연구자 선택 가능, SelectBox)
    // userType 상태관리
    const [userType, setUserType] = useState("후원자");

    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="text-4xl font-bold mb-2">Funs! CrowdFunding Service</h1>
        <br />
        <br />
        <div className="mb-4">
            <label htmlFor="userType" className="block text-lg mb-2">사용자 유형</label>
            <select 
                id="userType" 
                value={userType} 
                onChange={event => setUserType(event.target.value)}>
                <option value="후원자">후원자</option>
                <option value="연구자">연구자</option>
            </select>
        </div>
        <div className="inputUserInfo" style={{ display: "flex", justifyContent: "space-around", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column"}}>
                <h4 className="text-2xl font-semibold mb-4">회원정보 입력</h4>
                <br />
                <div className="mb-4">
                    <label htmlFor="image" className="block text-lg mb-2"> 프로필 이미지</label>
                    <input id="image" type="file" onChange={handleImageChange}></input>
                </div>
                <br />
                <div className="mb-4">
                    <label htmlFor="nickname" className="block text-lg mb-2">닉네임</label>
                    <textarea id="nickname" className="input-field px-4 py-2 border rounded" placeholder="닉네임을 입력하세요" onChange={handleNameChange} required></textarea>
                </div>
                <CheckNickButton nickname={nickname} setValidName={setValidName} />
                <br />
                <div className="mb-4">
                    <label htmlFor="introduction" className="block text-lg mb-2">자기소개</label>
                    <textarea id="introduction" className="input-field px-4 py-2 border rounded" placeholder="간단한 자기소개를 입력하세요" onChange={handleIntroChange}></textarea>
                </div>
                <br />
            </div>
            <Image
                src="/funding.png"
                alt="auth-page-image"
                width={800}
                height={800}
                style={{ marginLeft: "50px" }}
            />
        </div>
        <div
            className="exportUserBtn"
            style={{ display: "flex", justifyContent: "center" }}
        >
            <ExportUserInfoButton
                image={image}
                nickname={nickname}
                validName={validName}
                introduction={introduction}
                userType={userType}
            />
        </div>
    </div>
);
}