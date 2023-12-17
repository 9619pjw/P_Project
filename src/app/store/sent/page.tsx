"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 보낸 사람 (GET) /gifticon-service/order/gifticon/list/sent?page={n}&size={n}

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

// 보낸 기프티콘 정보
type SentGiftInfo = {
  gifticonId: number; // 기프티콘 ID
  gifticonName: string; // 기프티콘 이름
  fromUserNickname: string; // 준 사람 닉네임
  toUserNickname: string; // 받은 사람 닉네임
  serialNumber: string; // 기프티콘 시리얼 넘버
  letter: string; // 기프티콘 편지
  used: boolean; // 기프티콘 사용 여부
};

export default function SentGiftPage() {
  const [sentGifts, setSentGifts] = useState<SentGiftInfo[]>([]);
  const [selectedGift, setSelectedGift] = useState<SentGiftInfo | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleGoBack = (e: React.MouseEvent) => {
    window.location.href = `/store`;
  };


  useEffect(() => {
    const fetchSentGifts = async () => {
      const localStorage: Storage = window.localStorage;
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "https://funsns.shop:8000/gifticon-service/order/gifticon/list/sent",
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
        setSentGifts(data.data.orders); // 보낸 기프티콘 목록을 상태에 저장
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSentGifts();
  }, []);

  const openDetailModal = (gift: SentGiftInfo) => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-start pt-5">
      <h4 className="text-lg font-bold mb-4">보낸 기프티콘</h4>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-black">
            <th className="text-white px-4 py-2">기프티콘</th>
            <th className="text-white px-4 py-2">받은 사람</th>
            <th className="text-white px-4 py-2">편지</th>
          </tr>
        </thead>
        <tbody>
          {sentGifts.map((gift) => (
            <tr
              key={gift.gifticonId}
              onClick={() => openDetailModal(gift)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2">{gift.gifticonName}</td>
              <td className="px-4 py-2">{gift.toUserNickname}</td>
              <td className="px-4 py-2">{gift.letter}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedGift && (
        <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-5 w-72">
            <h5 className="font-bold">{selectedGift.gifticonName}</h5>
            <p className="mt-2">받은 사람: {selectedGift.toUserNickname}</p>
            <p className="mt-2">메시지 : {selectedGift.letter}</p>
            <p className="mt-2">
              {selectedGift.used ? "사용완료" : "사용가능"}
            </p>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"> 
        뒤로 가기 
      </button>
    </div>
  );
}
