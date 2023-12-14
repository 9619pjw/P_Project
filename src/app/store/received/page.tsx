"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

// 받은 기프티콘 조회 페이지
// 받은 사람 (GET) /gifticon-service/order/gifticon/list/received?page={n}&size={n}


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
    gifticonId ?: number; // 기프티콘 id
    image: string; // 기프티콘 이미지 
    categoryName: string; // 카테고리 이름
    gifticonName: string; // 상품명
    description: string; // 설명
    price: number; // 가격
    amount: number; // 수량
};

// 받은 기프티콘 정보
type ReceivedGiftInfo = {
    gifticonId: number;         // 기프티콘 ID
    gifticonName: string;       // 기프티콘 이름
    fromUserNickname: string;   // 준 사람 닉네임
    toUserNickname: string;     // 받은 사람 닉네임
    serialNumber: string;       // 기프티콘 시리얼 넘버
    letter: string;             // 기프티콘 편지
    used: boolean;              // 기프티콘 사용 여부
};


export default function ReceivedGiftPage(){

    const [receivedGifts, setReceivedGifts] = useState<ReceivedGiftInfo[]>([]);
    const [selectedGift, setSelectedGift] = useState<ReceivedGiftInfo | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const fetchReceivedGifts = async () => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch("https://funsns.shop:8000/gifticon-service/order/gifticon/list/received",
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
          setReceivedGifts(data.data.orders); // 받은 기프티콘 목록을 상태에 저장
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchReceivedGifts();
    }, []);
  
    
    const openDetailModal  = (gift: ReceivedGiftInfo) => {
        setSelectedGift(gift);
        setModalOpen(true);
    };
  
    return (
      <div>
        <h4>받은 기프티콘</h4>
        <table  className={styles.giftListTable}>
          <thead>
            <tr>
              <th>기프티콘</th>
              <th>Serial Num.</th>
              <th>사용 여부</th>
            </tr>
          </thead>
          <tbody>
            {receivedGifts.map((gift) => (
            <tr key={gift.gifticonId} onClick={() => openDetailModal(gift)}>
                <td>{gift.gifticonName}</td>
                <td>{gift.serialNumber}</td>
                <td>{gift.used ? "사용완료" : "사용가능"}</td>
            </tr>
            ))}
            </tbody>
        </table>
        {/* 상품 상세 화면 모달창 */}
        {modalOpen && selectedGift && (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "white", 
            borderRadius: "10px", 
            padding: "20px", 
            width: "300px" 
        }}>
            {/* 바코드 표시*/}
            <Image  
                src="/barcode.png"
                width={300}
                height={100}
                alt ="Barcode"
            />
            <p>Serial : {selectedGift.serialNumber}</p>
            <h5>{selectedGift.gifticonName}</h5>
            <p>보낸 사람 {selectedGift.fromUserNickname}</p>
            <p>메시지 : {selectedGift.letter}</p>
            <p>{selectedGift.used ? "사용완료" : "사용가능"}</p>
            <button type="button" onClick={() => {setModalOpen(false);}} className={styles.backbutton}>닫기</button>
          </div>
          </div>
      )}
      </div>
    );
}