"use client";
import { TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
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
      introduction: userData.introduction,
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

  // 사용자 닉네임 검색
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
    <div className="flex flex-col items-center">
    <div className="flex items-center space-x-4">
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
      {isYourProfile ? (
        <div className="mt-2">
          <button onClick={editProfile} className="border-2 border-gray-300 rounded-md p-2 flex items-center space-x-2">
            <img src="/edit-icon.png" alt="edit-icon" width={20} height={20} />
            <span>프로필 수정</span>
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
        <div></div>
      )}
    </div>
  </div>
    // <div className="profile-menu">
    //   <div className="profile-menu-search">
    //     <TextField
    //       id="outlined-basic"
    //       label="사용자 닉네임 검색"
    //       variant="outlined"
    //       value={checkName}
    //       onChange={typeName}
    //     />
    //     <Image
    //       onClick={searchNameFetch}
    //       src="/search.png"
    //       alt="search"
    //       width={40}
    //       height={40}
    //       style={{ margin: "10px 0 0 10px" }}
    //     />
    //     <ModalCustom
    //       show={showSearchNameModal}
    //       setShow={setShowSearchNameModal}
    //     >
    //       <div>
    //         <ShowSearchList searchNameResult={searchNameResult} />
    //       </div>
    //     </ModalCustom>
    //   </div>

    //   <div
    //     className="profile-3menu"
    //     style={{ flexDirection: "column", marginTop: "15px" }}
    //   >
    //     <IsYours
    //       pageId={pageId}
    //       isYou={isYourProfile}
    //       setIsYou={setIsYourProfile}
    //     />
    //     {isYourProfile ? (
    //       <div className="your-profile">
    //         {/* 프로필 수정 버튼*/}
    //         <div className="profile-edit" style={{ marginTop: "5px" }}>
    //           <Button
    //             variant="outlined"
    //             startIcon={<EditIcon />}
    //             onClick={editProfile}
    //           >
    //             프로필 수정
    //           </Button>
    //           {/* 프로필 수정 모달 */}
    //           <ModalCustom show={show} setShow={setShow}>
    //             <h2 style={{ marginBottom: "30px" }}>프로필 수정</h2>
    //             <InsertProfileImage
    //               profileImage={profileImage}
    //               setProfileImage={setProfileImage}
    //               profileImageFile={profileImageFile}
    //               setProfileImageFile={setProfileImageFile}
    //             />
    //             <TextField
    //               label="닉네임"
    //               variant="outlined"
    //               value={typeNickname}
    //               onChange={handleNameChange}
    //             />
    //             <CheckNickButton
    //               nickname={typeNickname}
    //               setValidName={setValidName}
    //             />
    //             {validName ? (
    //               <Button
    //                 variant="outlined"
    //                 onClick={postEditProfile}
    //                 style={{ marginTop: 10 }}
    //               >
    //                 프로필 수정 제출
    //               </Button>
    //             ) : (
    //               <Button variant="outlined" style={{ marginTop: 10 }} disabled>
    //                 프로필 수정 제출
    //               </Button>
    //             )}
    //           </ModalCustom>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="another-profile">
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}