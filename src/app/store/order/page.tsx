"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 기프티콘 구매 주문 요청
// (POST) /gifticon-service/order/gifticon

// 주문 정보
type OrderInfo = {
  gifticonId?: number; // 기프티콘 ID
  toUserNickName: string; // 기프티콘을 받는 사용자의 닉네임
  amount: number; // 기프티콘 주문 수량
  letter: string; // 기프티콘에 담을 편지
};

// 주문자 정보
type UserInfo = {
  userId: number;
  nickname: string;
  balance: number;
};

// 기프티콘 정보
type GiftInfo = {
  gifticonId?: number; // 기프티콘 id
  image: string; // 기프티콘 이미지
  categoryName: string; // 카테고리 이름
  gifticonName: string; // 상품명
  description: string; // 설명
  price: number; // 가격
  amount: number; // 수량
};

export default function GiftOrderPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    gifticonId: undefined,
    toUserNickName: "",
    amount: 0,
    letter: "",
  });

  const [gifticon, setGifticon] = useState<GiftInfo | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const gifticonId = params.get("gifticonId"); // 쿼리 파라미터 'gifticonId' 받아

  // 기프티콘 정보 불러옴
  useEffect(() => {
    const fetchGifticon = async () => {
      const localStorage: Storage = window.localStorage;
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          `https://funsns.shop:8000/gifticon-service/gifticon/${gifticonId}`,
          {
            method: "GET",
            headers: {
              Credentials: "include",
              ContentType: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // 기프티콘 정보 저장
        setGifticon(data.data);
        // 기프티콘 ID 주문 정보에 저장
        setOrderInfo({ ...orderInfo, gifticonId: data.data.gifticonId });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (gifticonId) {
      fetchGifticon();
    }
  }, [gifticonId]);

  // 뒤로가기 버튼
  const handleGoBack = () => {
    window.location.href = "/store";
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("권한이 없습니다.");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(
        "https://funsns.shop:8000/gifticon-service/order/gifticon",
        {
          method: "POST",
          headers: {
            //Credentials: "include",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gifticonId: orderInfo.gifticonId,
            toUserNickname: orderInfo.toUserNickName,
            amount: orderInfo.amount,
            letter: orderInfo.letter,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === "SUCCESS") {
        alert(data.message);
        // 주문 성공 후 원하는 페이지로 이동
        router.push("/store/sent");
      } else {
        alert("주문에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-start pt-5">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white rounded-lg p-5 w-72"
      >
        {gifticon && (
          <Image
            src={gifticon.image} // 기프티콘의 이미지 URL을 사용
            alt={`기프티콘 ${gifticonId}`}
            width={500}
            height={500}
          />
        )}
        <div className="mt-4">
          <p>상품명 : {gifticon?.gifticonName}</p>
          <div className="mt-4">
            <label>받을사람 닉네임</label>
            <input
              type="text"
              name="toUserNickName"
              value={orderInfo.toUserNickName}
              onChange={handleChange}
              placeholder="기프티콘 받을 사용자의 닉네임"
              required
              className="mt-2 border border-gray-300 px-2 w-full"
            />
          </div>
          <div className="mt-4">
            <label>주문 수량</label>
            <input
              type="number"
              name="amount"
              value={orderInfo.amount}
              onChange={handleChange}
              placeholder="기프티콘 주문 수량"
              required
              className="mt-2 border border-gray-300 px-2 w-full"
            />
          </div>
          <div className="mt-4">
            <label>편지</label>
            <textarea
              name="letter"
              value={orderInfo.letter}
              onChange={handleChange}
              placeholder="기프티콘에 담을 편지"
              required
              className="mt-2 border border-gray-300 px-2 w-full h-48"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            선물하기
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            뒤로가기
          </button>
        </div>
      </form>
    </div>
  );
}
