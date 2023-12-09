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
  introduction: string | null;
  profileImage: string | null | undefined;
  availableFollow : boolean;
};

type ProfileProps = {
  userJSON: UserJSON;
  pageId: number;
};

export default function ProfileMenu({ pageId, userJSON }: ProfileProps) {
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

  // 프로필 수정 모달
  const [show, setShow] = useState(false);
  const editProfile = () => {
    setShow(true);
  };

  // 프로필 수정 제출
  async function postEditProfile() {
    const editProfileURL = `https://funsns.shop:8000/user-service/user/update/profile`;

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // FormEditData 생성
    const UserEditFormData = new FormData();

    let EditProfileRequest = {
      nickname: typeNickname,
      introduction: introduction,
    };

    // FormEditData에 데이터 추가
    UserEditFormData.append(
      "updateProfile",
      new Blob([JSON.stringify(EditProfileRequest)], {
        type: "application/json",
      })
    );
    if (profileImageFile) {
      UserEditFormData.append("image", profileImageFile);
    }

    // 프로필 수정 제출 fetch
    fetch(editProfileURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: UserEditFormData,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("프로필 수정이 완료되었습니다.");
          setShow(false);
          setNickname("");
          setValidName(false);
          location.reload();
        } else {
          alert("프로필 수정에 실패하였습니다.");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw new Error("서버 요청 실패!");
      });
  }

  // 팔로우 요청 함수
  async function handleFollowRequest() {
    const followURL = `https://funsns.shop:8000/follow-service/follow/${userData.userId}`;
  
    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
  
    // 팔로우 요청 보내기
    fetch(followURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("팔로우 신청이 완료되었습니다.");
        } else {
          alert("팔로우 신청에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error("서버 요청 실패!");
      });
  }
  // 언팔로우 요청 함수
async function handleUnFollowRequest() {
  const unFollowURL = `https://funsns.shop:8000/follow-service/unfollow/${userData.userId}`;

  // 액세스 토큰 가져오기
  const localStorage: Storage = window.localStorage;
  const token = localStorage.getItem("accessToken");

  // 언팔로우 요청 보내기
  fetch(unFollowURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        alert("언팔로우가 완료되었습니다.");
        // 팔로워, 팔로잉 카운트 감소
      } else {
        alert("언팔로우에 실패하였습니다.");
      }
    })
    .catch((err) => {
      console.log(err);
      throw new Error("서버 요청 실패!");
    });
}

  

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
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-2"></h1>
  </div>
  {isYourProfile ? (
      <div className="mt-2">
        <button onClick={editProfile} className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
          프로필 수정
        </button>
        <ModalCustom show={show} setShow={setShow}>
          <h2 className="mb-8">프로필 수정</h2>
          <InsertProfileImage
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            profileImageFile={profileImageFile}
            setProfileImageFile={setProfileImageFile}
          />
          <input
            placeholder="닉네임"
            className="border-2 border-gray-300 rounded-md p-2 mt-4"
            value={typeNickname}
            onChange={handleNameChange}
          />
          <CheckNickButton
            nickname={typeNickname}
            setValidName={setValidName}
          />
          <textarea
            placeholder="자기소개"
            className="border-2 border-gray-300 rounded-md p-2 mt-4"
            value={introduction}
            onChange={handleIntroductionChange}
          />
          <br />
          {validName ? (
            <button
              onClick={postEditProfile}
              className="border-2 border-gray-300 rounded-md p-2 mt-4"
            >
              프로필 수정 제출
            </button>
          ) : (
            <button
              className="border-2 border-gray-300 rounded-md p-2 mt-4"
              disabled
            >
              프로필 수정 제출
            </button>
          )}
        </ModalCustom>
      </div>
    ) : (
      <div className="mt-2">
          <button onClick={handleFollowRequest} className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
            {userJSON.availableFollow ? "팔로우 신청" : "언팔로우"}
          </button>
      </div>
    )}
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
  <div className="flex flex-col items-center mt-4">
    <IsYours
      pageId={pageId}
      isYou={isYourProfile}
      setIsYou={setIsYourProfile}
    />
  </div>
</div>
  );
}