"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Home.module.css";
import Image from "next/image";
import Link from 'next/link';
import Head from 'next/head';

type UserJSON = {
	userId: number;
	name : string;
	nickname: string;
	introduction: string | null;
	profileImage: string | null | undefined;
  };
  

type PageParams = {
  id: number;
};

// 사용자 포인트 정보
type UserInfo = {
  userId: number;
  nickname: string;
  balance: number;
};


type GiftInfo = {
  gifticonId ?: number; // 기프티콘 id
  image: string | null; // 기프티콘 이미지 추가
  categoryName: string; // 카테고리 이름
  gifticonName: string; // 상품명
  description: string; // 설명
  price: number; // 가격
  amount: number; // 수량
};


export default function GifticonPage({ params }: { params: PageParams }) {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  async function fetchUserInfo() {
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    const response = await fetch("https://funsns.shop:8000/point-service/point", {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if(response.ok) {
      const data = await response.json();
      if(data.code === "SUCCESS") {
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

//   const [gifts, setGifts] = useState<GiftInfo[]>([]);
//   const [foodGifts, setFoodGifts] = useState<GiftInfo[]>([]);
//   const [sportGifts, setSportGifts] = useState<GiftInfo[]>([]);

//   const [selectedGift, setSelectedGift] = useState<GiftInfo | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const router = useRouter();

  const [form, setForm] = useState<GiftInfo>({
    image: "",
    categoryName: "food",
    gifticonName: "",
    description: "",
    price: 0,
    amount: 0,
  });

//   const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 선물하기 버튼
//   const handleGiftOrder = (e : React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (selectedGift) {
//       if (userInfo && userInfo.balance < selectedGift.price) {
//         alert('포인트가 부족합니다!');
//       } else {
//         router.push(`/gift/order?gifticonId=${selectedGift.gifticonId}`);
//       }
//     } else {
//       console.error('No gift selected');
//     }
    
//   };

//   // 받은 기프티콘 조회 버튼
//   const handleGiftReceived = (e:React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     router.push('/gift/received');
//   };

//   // 보낸 기프티콘 조회 버튼
//   const handleGiftSent = (e:React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     router.push('gift/sent')
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // 로컬스토리지 토큰 가져오기
//     const localStorage: Storage = window.localStorage;
//     const token = localStorage.getItem("accessToken");

//     // 토큰이 없으면 홈페이지로 리디렉션
//     if (!token) {
//       alert("권한이 없습니다.");
//       router.push("/admin");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       let CreateGifticonRequest = {
//         categoryName: form.categoryName,
//         gifticonName: form.gifticonName,
//         description: form.description,
//         price: form.price,
//         amount: form.amount,
//       };

//       formData.append(
//         "registerGifticonRequest",
//         new Blob([JSON.stringify(CreateGifticonRequest)], {
//           type: "application/json",
//         })
//       );

//       if (image) {
//         formData.append("image", image);
//       }
//       // 데이터 확인

//       console.log(formData);
//       Array.from(formData.entries()).forEach(([key, value]) => {
//         console.log(key, value);
//       });

//       const response = await fetch(
//         "https://withsports.shop:8000/gifticon-service/gifticon",
//         {
//           method: "POST",
//           headers: {
//             Credentials: "include",
//             ContentType: "multipart/form-data;",
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       if (data.code === "SUCCESS") {
//         alert(data.message);
//         setForm({
//           image: "",
//           categoryName: "",
//           gifticonName: "",
//           description: "",
//           price: 0,
//           amount: 0,
//         });
//         window.location.reload();
//       } else {
//         alert("등록에 실패하였습니다.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setIsEditing(false);
//   };

//   const fetchGifts = async (categoryName: string, setGifts: React.Dispatch<React.SetStateAction<GiftInfo[]>>) => {
//     // 로컬스토리지 토큰 가져오기
//     const localStorage: Storage = window.localStorage;
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await fetch(
//         `https://withsports.shop:8000/gifticon-service/gifticon/category/${categoryName}`,
//         {
//           method: "GET",
//           headers: {
//             Credentials: "include",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         const message = await response.text();
//         throw new Error(message);
//       }
//       const data = await response.json();
//       if (data.code === "SUCCESS") {
//         setGifts(data.data.gifticonList);
//       } else {
//         console.error("Error: Failed to fetch gifticons");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGifts('food', setFoodGifts);
//     fetchGifts('sportequipment', setSportGifts);
//   }, []);

//   // 상세 정보
//   const openDetailModal = (gift: GiftInfo) => {
//     setSelectedGift(gift);
//     setForm(gift);
//     setModalOpen(true);
//     console.log('Image URL:', gift.image);
//     console.log(gift.gifticonId);
//  };

  return (
    <>
      <Head>
        <title>User Point Page</title>
      </Head>
      <div className="bg-gray-100 container mx-auto px-4 py-8 flex flex-col items-center">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{userInfo?.nickname} 님의 포인트</h1>
        </header>

        {userInfo ? (
          <div className="text-center">
            <p className="mb-6 text-gray-600">포인트 잔액: {userInfo.balance}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              <Link href="/point">
                <a className="text-white no-underline">포인트 내역</a>
              </Link>
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}