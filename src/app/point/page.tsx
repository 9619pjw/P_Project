"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Home.module.css";
import Image from "next/image";
import Head from 'next/head';

// 사용자 포인트 정보
type UserInfo = {
  userId: number; // 사용자 ID
  nickname: string; // 사용자 닉네임
  balance: number; // 사용자 포인트 잔액
};

// 포인트 사용내역 정보
type PointHistory = {
  userId: number; // 사용자 ID
  balanceAtThatTime: number; // 거래 발생 해당 시점의 잔액
  amount: number; // 거래 금액
  type: 0 | 1; // 0: (포인트 받음)증가, 1 : (포인트 사용)감소
  description: string; // 거래 내역
  createdAt?: Date; // 거래 발생 시간
};

type PageParams = {
  id: number;
};

// (GET) /point-service/points?page=0&size=5  포인트 내역 조회
export default function PointPage() {
  // 사용자 정보
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  async function fetchUserInfo() {
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      "https://funsns.shop:8000/point-service/point",
      {
        method: "GET",
        headers: {
          Credentials: "include",
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.code === "SUCCESS") {
        setUserInfo(data.data);
      } else {
        console.error("Failed to fetch user info");
      }
    } else {
      throw new Error("Network response was not ok");
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 포인트 사용 내역
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);

  async function fetchPointHistory() {
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      "https://funsns.shop:8000/point-service/points",
      {
        method: "GET",
        headers: {
          Credentials: "include",
          ContentType: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.code === "SUCCESS") {
        setPointHistory(data.data.points);
      } else {
        console.error("Failed to fetch point history");
      }
    } else {
      throw new Error("Network response was not ok");
    }
  }

  useEffect(() => {
    fetchPointHistory();
  }, []);

  const router = useRouter();

  const handleGoBack = () => {
    window.location.href = "/store";
  };

  return (
    <>
    <Head>
      <title>User Point History</title>
    </Head>
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex flex-col items-center">
      {userInfo ? (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{userInfo?.nickname} 님의 포인트 잔액: {userInfo.balance}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleGoBack} className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
        뒤로가기
      </button>
      <h4 className="text-2xl font-semibold mb-4">포인트 내역</h4>
      {/* 포인트 내역 목록 출력하기 */}
      {pointHistory.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">거래 시간</th>
              <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">거래 금액</th>
              <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">거래 내역</th>
              <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">거래 후 잔액</th>
            </tr>
          </thead>
          <tbody>
            {pointHistory.map((history, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="border-b border-gray-300 text-center px-2 py-1">{new Date(history.createdAt!).toLocaleString()}{" "}</td>
                <td className="border-b border-gray-300 text-center px-2 py-1">{history.amount}</td>
                <td className="border-b border-gray-300 text-center px-2 py-1">{history.description}</td>
                <td className="border-b border-gray-300 text-center px-2 py-1">{history.balanceAtThatTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mb-6 text-gray-600">포인트 사용 내역이 없습니다.</p>
      )}
    </div>
  </>
  );
}
