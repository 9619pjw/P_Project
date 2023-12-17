"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../Home.module.css";
import Image from "next/image";

type GiftInfo = {
  gifticonId?: number;
  image: string | null; // 기프티콘 이미지 추가
  categoryName: string; // 카테고리 이름
  gifticonName: string; // 상품명
  description: string; // 설명
  price: number; // 가격
  amount: number; // 수량
};

export default function GifticonPage() {
  // 기프티콘 등록
  const [serviceGifts, setServiceGifts] = useState<GiftInfo[]>([]);
  const [productGifts, setProductGifts] = useState<GiftInfo[]>([]);

  // 기프티콘 상세
  const [selectedGift, setSelectedGift] = useState<GiftInfo | null>(null);
  // 기프티콘 수정
  const [isEditing, setIsEditing] = useState(false);
  // 이미지
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const [form, setForm] = useState<GiftInfo>({
    image: "",
    categoryName: "service",
    gifticonName: "",
    description: "",
    price: 0,
    amount: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 이미지
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !image ||
      !form.categoryName ||
      !form.gifticonName ||
      !form.description ||
      !form.price ||
      !form.amount
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    console.log(isEditing);

    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 토큰이 없으면 홈페이지로 리디렉션
    if (!token) {
      alert("권한이 없습니다.");
      router.push("/admin");
      return;
    }
    try {
      // 이미지 추가
      const formData = new FormData();
      let CreateGifticonRequest = {
        categoryName: form.categoryName,
        gifticonName: form.gifticonName,
        description: form.description,
        price: form.price,
        amount: form.amount,
      };

      formData.append(
        "registerGifticonRequest",
        new Blob([JSON.stringify(CreateGifticonRequest)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("image", image);
      }
      // 데이터 확인

      console.log(formData);
      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(key, value);
      });

      const response = await fetch(
        "https://funsns.shop:8000/gifticon-service/gifticon",
        {
          method: "POST",
          headers: {
            Credentials: "include",
            ContentType: "multipart/form-data;",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === "SUCCESS") {
        alert(data.message);
        setForm({
          image: "",
          categoryName: "",
          gifticonName: "",
          description: "",
          price: 0,
          amount: 0,
        });
        window.location.reload();
      } else {
        alert("등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setAddModalOpen(false);
    setIsEditing(false);
  };

  const fetchGifts = async (
    categoryName: string,
    setGifts: React.Dispatch<React.SetStateAction<GiftInfo[]>>
  ) => {
    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://funsns.shop:8000/gifticon-service/gifticon/category/${categoryName}`,
        {
          method: "GET",
          headers: {
            Credentials: "include",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      const data = await response.json();
      if (data.code === "SUCCESS") {
        setGifts(data.data.gifticonList);
      } else {
        console.error("Error: Failed to fetch gifticons");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchGifts("service", setServiceGifts);
    fetchGifts("product", setProductGifts);
  }, []);

  // 상세 정보
  const openDetailModal = (gift: GiftInfo) => {
    setSelectedGift(gift);
    setForm(gift);
    setAddModalOpen(false);
    setModalOpen(true);
    console.log("Image URL:", gift.image);
    console.log(gift.gifticonId);
  };

  // TODO :  수정 ... (PUT) /gifticon-service/gifticon/{gifticonId}
  // => 기프티콘 등록과 동일한 방식으로 모달창으로 정보 수정
  const handleUpdate = () => {
    if (!selectedGift) {
      console.error("selectedGift is null");
      return;
    }
    setForm(selectedGift);
    setTimeout(() => {
      setIsEditing(true);
    }, 0);
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGift) {
      console.error("selectedGift is null");
      return;
    }

    // 로컬스토리지 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 토큰이 없으면 홈페이지로 리디렉션
    if (!token) {
      alert("권한이 없습니다.");
      router.push("/admin");
      return;
    }

    try {
      // 이미지 추가
      const formData = new FormData();
      let updateGifticonRequest = {
        categoryName: form.categoryName,
        gifticonName: form.gifticonName,
        description: form.description,
        price: form.price,
        amount: form.amount,
      };

      formData.append(
        "updateGifticonRequest",
        new Blob([JSON.stringify(updateGifticonRequest)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `https://funsns.shop:8000/gifticon-service/gifticon/${selectedGift.gifticonId}`,
        {
          method: "PUT",
          headers: {
            Credentials: "include",
            ContentType: "multipart/form-data;",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.code === "SUCCESS") {
        alert("성공적으로 수정되었습니다.");
        window.location.reload();
      } else {
        alert("수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setModalOpen(false);
    setIsEditing(false);
  };

  // TODO :  삭제 ... (DELETE) /gifticon-service/gifticon/${gifticonId} => 삭제하시겠습니까? 알림 이후 진행
  const handleDelete = async () => {
    if (selectedGift && window.confirm("해당 상품을 삭제하시겠습니까?")) {
      const localStorage: Storage = window.localStorage;
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          `https://funsns.shop:8000/gifticon-service/gifticon/${selectedGift.gifticonId}`,
          {
            method: "DELETE",
            headers: {
              Credentials: "include",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.code === "SUCCESS") {
          alert("성공적으로 삭제되었습니다.");
          window.location.reload();
        } else {
          alert("삭제에 실패하였습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-start pt-5">
        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-8"
        >
          기프티콘 등록
        </button>
        {addModalOpen && (
          <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50">
            <form
              onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-5 w-72"
            >
              {/* 이미지 등록 폼 */}
              <label className="flex flex-col items-start mb-4">
                Image
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                />
              </label>

              <label className="flex flex-col items-start mb-4">
                Category
                <select
                  name="categoryName"
                  value={form.categoryName}
                  onChange={handleChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                >
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
              </label>
              <label className="flex flex-col items-start mb-4">
                Gifticon
                <input
                  type="text"
                  name="gifticonName"
                  onChange={handleChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                />
              </label>
              <label className="flex flex-col items-start mb-4">
                Description
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                />
              </label>
              <label className="flex flex-col items-start mb-4">
                Price
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                />
              </label>
              <label className="flex flex-col items-start mb-4">
                Amount
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  className="mt-2 border border-gray-300 px-2 w-full"
                />
              </label>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}
        <h3 className="mb-4">펀딩 출시 서비스</h3>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="bg-black">
              <th className="text-white px-5 py-3">카테고리</th>
              <th className="text-white px-5 py-3">상품명</th>
              <th className="text-white px-5 py-3">설명</th>
              <th className="text-white px-5 py-3">가격</th>
              <th className="text-white px-5 py-3">수량</th>
            </tr>
          </thead>
          <tbody>
            {serviceGifts.length === 0 ? (
              <tr>
                <td colSpan={5}>상품을 등록해주세요!</td>
              </tr>
            ) : (
              serviceGifts.map((gift, index) => (
                <tr
                  key={index}
                  onClick={() => openDetailModal(gift)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="text-black px-5 py-3">서비스</td>
                  <td className="text-black px-5 py-3">{gift.gifticonName}</td>
                  <td className="text-black px-5 py-3">{gift.description}</td>
                  <td className="text-black px-5 py-3">{gift.price}</td>
                  <td className="text-black px-5 py-3">{gift.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h3 className="mt-8 mb-4">펀딩 출시 제품</h3>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="bg-black">
              <th className="text-white px-5 py-3">카테고리</th>
              <th className="text-white px-5 py-3">상품명</th>
              <th className="text-white px-5 py-3">설명</th>
              <th className="text-white px-5 py-3">가격</th>
              <th className="text-white px-5 py-3">수량</th>
            </tr>
          </thead>
          <tbody>
            {productGifts.length === 0 ? (
              <tr>
                <td colSpan={5}>상품을 등록해주세요!</td>
              </tr>
            ) : (
              productGifts.map((gift, index) => (
                <tr
                  key={index}
                  onClick={() => openDetailModal(gift)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  <td className="text-black px-5 py-3">제품</td>
                  <td className="text-black px-5 py-3">{gift.gifticonName}</td>
                  <td className="text-black px-5 py-3">{gift.description}</td>
                  <td className="text-black px-5 py-3">{gift.price}</td>
                  <td className="text-black px-5 py-3">{gift.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {modalOpen && selectedGift && (
          <div className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50">
            <form
              onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
              className="flex flex-col items-center justify-center bg-white rounded-lg p-5 w-72"
            >
              {/*  수정폼 */}

              <form
                onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
                className="flex flex-col items-center justify-center bg-white rounded-lg p-5 w-72"
              >
                {/* 이미지 표시*/}
                {selectedGift.image && (
                  <Image
                    src={selectedGift.image}
                    alt={selectedGift.gifticonName}
                    width={200}
                    height={200}
                  />
                )}
              </form>

              {isEditing ? (
                <>
                  {/* 이미지 등록 폼*/}
                  <label className="flex flex-col items-start mb-4">
                    Image
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      className="mt-2 border border-gray-300 px-2 w-full"
                    />
                  </label>
                  <label className="flex flex-col items-start mb-4">
                    Category
                    <select
                      name="categoryName"
                      value={form.categoryName}
                      onChange={handleChange}
                      className="mt-2 border border-gray-300 px-2 w-full"
                    >
                      <option value="service">Service</option>
                      <option value="product">Product</option>
                    </select>
                  </label>
                </>
              ) : null}

              <input
                type="text"
                name="gifticonName"
                value={form.gifticonName}
                onChange={handleChange}
                placeholder="상품명"
                required
                className="mt-2 border border-gray-300 px-2 w-full"
                readOnly={!isEditing}
              />
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="설명"
                required
                className="mt-2 border border-gray-300 px-2 w-full"
                readOnly={!isEditing}
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="가격"
                required
                className="mt-2 border border-gray-300 px-2 w-full"
                readOnly={!isEditing}
              />
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="수량"
                required
                className="mt-2 border border-gray-300 px-2 w-full"
                readOnly={!isEditing}
              />
              <div className="flex justify-between">
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      수정 완료
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      정보 수정
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalOpen(false);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      취소
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}