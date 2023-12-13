"use client";
import { useState } from "react";
import ModalCustom from "@/components/ModalCustom";
import CheckNickButton from "@/app/auth/AuthComponent/CheckNickButton";
import InsertProfileImage from "./InsertProfileImage";
import ShowSearchList from "./ShowSearchList";
import IsYours from "./IsYours";


type UserJSON = {
  userId: number;
  name : string;
  nickname: string;
  profileImage: string | null | undefined;
  introduction: string | null;
  availableFollow : boolean;
  followerCount : number;
  followingCount : number;
  userType : string;
};

type ProfileProps = {
  userJSON: UserJSON;
};

export default function Profile({ userJSON }: ProfileProps) {
  
  console.log("userJSON:");
  console.log(userJSON);
  let userData = userJSON;

  // 본인 프로필인지 확인
  const [isYourProfile, setIsYourProfile] = useState(false);
  const switchYours = () => {
    setIsYourProfile(!isYourProfile);
  };

  // 검색할 닉네임
  const [checkName, setCheckname] = useState("");
  const typeName = (e: any) => {
    setCheckname(e.target.value);
  };

  // 프로필 이미지 상태관리
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [profileImageFile, setProfileImageFile] = useState<File | undefined>();

  // 닉네임 입력 상태관리
  const [typeNickname, setNickname] = useState("");
  const handleNameChange = (event: any) => {
    setNickname(event.target.value);
  };

  // 닉네임 중복 상태관리
  const [validName, setValidName] = useState(false);

  // introduction 상태관리
  const [introduction, setIntroduction] = useState(userData.introduction || "");

  const handleIntroductionChange = (event: any) => {
    setIntroduction(event.target.value);
  };

  // 사용자 닉네임 검색결과 저장
  type SearchNameUser = {
    userId: number;
    nickname: string;
    introduction: string | null;
    profileImage: string | null;
  };

  type SearchNameList = {
    data: SearchNameUser[];
  };

  const [searchNameResult, setSearchNameResult] = useState<SearchNameList>({
    data: [
      {
        userId: 0,
        nickname: "",
        introduction: "",
        profileImage: "",
      },
    ],
  });
  // 사용자 닉네임 검색결과 모달
  const [showSearchNameModal, setShowSearchNameModal] = useState(false);

  // 사용자 닉네임 검색 fetch
  async function searchNameFetch() {
    const nickname = checkName;
    console.log("nickname: " + nickname);

    // 사용자 닉네임 검색 API
    const searchNameURL = `https://funsns.shop:8000/user-service/user/nickname/${nickname}`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    const response = await fetch(searchNameURL, {
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: SearchNameList) => {
        console.log(data);
        if (data.data !== null) {
          setSearchNameResult(data);
          console.log("search data: ");
          console.log(data);
          alert("검색에 성공하였습니다.");
          setShowSearchNameModal(true);
        } else if (data.data === null) {
          alert("없는 닉네임입니다.");
          setCheckname("");
        }
      });
  }



  return (
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex flex-col items-center">
      <div className="flex items-center space-x-4 mb-8">
      <input
        id="outlined-basic"
        placeholder="사용자 닉네임 검색"
        className="border-2 border-gray-300 rounded-md p-2"
        value={checkName}
        onChange={typeName}
      />
      <img
        onClick={searchNameFetch}
        src="/search.png"
        alt="search"
        width={40}
        height={40}
        className="ml-2 cursor-pointer"
      />
      <ModalCustom
        show={showSearchNameModal}
        setShow={setShowSearchNameModal}
      >
        <div>
          <ShowSearchList searchNameResult={searchNameResult} />
        </div>
      </ModalCustom>
      </div>
      <div className="flex justify-center">
        <img
          className="rounded-full border-2 border-blue-500"
          src={userData.profileImage ? userData.profileImage : "/default-profile.png"}
          alt="profile"
          width={200}
          height={200}
        />
      </div>
      <div className="text-center bg-blue-100 p-5 rounded mt-5">
        <div className="flex justify-center items-center space-x-4">
          <h1 className="font-bold text-2xl text-blue-800">{userData.nickname}</h1>
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          {userData.introduction}
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          팔로워 수: {userData.followerCount}
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          팔로잉 수: {userData.followingCount}
        </div>
      </div>
    </div>
  );
}
