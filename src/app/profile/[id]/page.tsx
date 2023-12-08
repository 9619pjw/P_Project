"use client";
import { useEffect, useState } from "react";
import ProfileInfo from "./profileComponent/ProfileInfo";
import ProfileMenu from "./profileComponent/ProfileMenu";
// import RankingInfo from "./profileComponent/RankingInfo";

type PageParams = {
  id: number;
};

type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string | null;
  imageUrl: string | null;
};
export default function ProfilePage({ params }: { params: PageParams }) {
  // 팀 정보를 불러왔는지 여부
  const [showUserInfo, setShowUserInfo] = useState(false);

  let userJSON: UserJSON = {
    userId: 0,
    nickname: "위스",
    introduction: "반갑습니다",
    imageUrl: "/default-profile.png",
  };
  const [data, setData] = useState<UserJSON>(userJSON);

  // TODO: GET - id에 맞는 사용자 정보 가져오기
  async function getUserInfo() {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    let userId = params.id;

    // 요청 URL - PathVariable 없는 본인 프로필 조회
    // const getUserInfoURL: string = `https://withsports.shop:8000/user-service/user/profile`;

    // 요청 URL - PathVariable: userId
    const getUserInfoURL: string = `https://funsns.shop:8000/user-service/user/${userId}`;

    const response = await fetch(getUserInfoURL, {
      method: "GET",
      headers: {
        "Credentials": "include",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:");
        console.log(data);
        if (data.code === "SUCCESS") {
          console.log("사용자 정보를 불러오는데 성공했습니다.");
        } else {
          console.log("사용자 정보를 불러오는데 실패했습니다.");
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
      });

    // 응답값 확인
    let body: UserJSON;
    if (response) {
      // data부분만 가져오기
      body = await response.data;
      console.log("body:");
      console.log(body);
      return body;
    } else {
      console.log("응답이 없습니다.");
      return null;
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      let userInfo = await getUserInfo();
      if (userInfo) {
        console.log("userInfo:");
        console.log(userInfo);
        setData(userInfo);
        console.log("data:");
        console.log(data);
      }
    }
    fetchUserData();
    setShowUserInfo(true);
  }, []);

  return (
    <div>
      {!showUserInfo && <div>유저 정보를 불러오는 중입니다...</div>}
      {showUserInfo && (
        <div>
          <ProfileInfo userJSON={data} />
          <ProfileMenu pageId={params.id} userJSON={data} />
        </div>
      )}
    </div>
  );
}
