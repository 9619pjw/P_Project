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

// 페이지네이션 추가하기


export default function GifticonPage() {
  // 기프티콘 등록
  const [foodGifts, setFoodGifts] = useState<GiftInfo[]>([]);
  const [sportGifts, setSportGifts] = useState<GiftInfo[]>([]);

  // 기프티콘 상세
  const [selectedGift, setSelectedGift] = useState<GiftInfo | null>(null);
  // 기프티콘 수정
  const [isEditing, setIsEditing] = useState(false);
  // 이미지
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const [form, setForm] = useState<GiftInfo>({
    image: "",
    categoryName: "food",
    gifticonName: "",
    description: "",
    price: 0,
    amount: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (!image || !form.categoryName || !form.gifticonName || !form.description || !form.price || !form.amount) {
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
    fetchGifts("food", setFoodGifts);
    fetchGifts("sportequipment", setSportGifts);
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
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "20px",
        }}
      >
        <button
          onClick={() => setAddModalOpen(true)}
          className={styles.addButton}
        >
          기프티콘 등록
        </button>
        {/* 상품 등록 모달창 */}
        {addModalOpen && (
          <div
            style={{
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
            <form
              onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
              className={styles["modal-form"]}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                width: "300px",
              }}
            >
              {/* 이미지 등록 폼 */}
              <label>
                Image
                <input type="file" name="image" onChange={handleImageChange} />
              </label>

              <label>
                Category
                <select
                  name="categoryName"
                  value={form.categoryName}
                  onChange={handleChange}
                >
                  <option value="food">Food</option>
                  <option value="sportequipment">Sport Equipment</option>
                </select>
              </label>
              <label>
                Gifticon
                <input
                  type="text"
                  name="gifticonName"
                  onChange={handleChange}
                />
              </label>
              <label>
                Description
                <input type="text" name="description" onChange={handleChange} />
              </label>
              <label>
                Price
                <input type="number" name="price" onChange={handleChange} />
              </label>
              <label>
                Amount
                <input type="number" name="amount" onChange={handleChange} />
              </label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  className={styles.addButton}
                  style={{ marginRight: "10px" }}
                >
                  등록
                </button>
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className={styles.deletebutton}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        )}

        <h3>식품</h3>
        {/* food 상품 목록 창 */}
        <table className={styles.giftListTable} style={{ marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "black" }}>
              <th style={{ color: "white", padding: "20px" }}>카테고리</th>
              <th style={{ color: "white", padding: "20px" }}>상품명</th>
              <th style={{ color: "white", padding: "20px" }}>설명</th>
              <th style={{ color: "white", padding: "20px" }}>가격</th>
              <th style={{ color: "white", padding: "20px" }}>수량</th>
            </tr>
          </thead>
          <tbody>
            {foodGifts.length === 0 ? (
              <tr>
                <td colSpan={5}>상품을 등록해주세요!</td>
              </tr>
            ) : (
              foodGifts.map((gift, index) => (
                <tr key={index} onClick={() => openDetailModal(gift)}>
                  <td>식품</td>
                  <td>{gift.gifticonName}</td>
                  <td>{gift.description}</td>
                  <td>{gift.price}</td>
                  <td>{gift.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h3>스포츠 용품</h3>
        {/* sportequipment 상품 목록 창 */}
        <table className={styles.giftListTable} style={{ marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "black" }}>
              <th style={{ color: "white", padding: "20px" }}>카테고리</th>
              <th style={{ color: "white", padding: "20px" }}>상품명</th>
              <th style={{ color: "white", padding: "20px" }}>설명</th>
              <th style={{ color: "white", padding: "20px" }}>가격</th>
              <th style={{ color: "white", padding: "20px" }}>수량</th>
            </tr>
          </thead>
          <tbody>
            {sportGifts.length === 0 ? (
              <tr>
                <td colSpan={5}>상품을 등록해주세요!</td>
              </tr>
            ) : (
              sportGifts.map((gift, index) => (
                <tr key={index} onClick={() => openDetailModal(gift)}>
                  <td>운동기구</td>
                  <td>{gift.gifticonName}</td>
                  <td>{gift.description}</td>
                  <td>{gift.price}</td>
                  <td>{gift.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 상품 상세 화면 모달창 */}
        {modalOpen && selectedGift && (
          <div
            style={{
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
            {/*  수정폼 */}

            <form
              onSubmit={isEditing ? handleUpdateSubmit : handleSubmit}
              className={styles["modal-form"]}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                width: "300px",
              }}
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

              {isEditing ? (
                <>
                {/* 이미지 등록 폼*/}
                  <label>
                      Image
                      <input type="file" name="image" onChange={handleImageChange} />
                  </label>
                  <label>
                      Category
                      <select
                        name="categoryName"
                        value={form.categoryName}
                        onChange={handleChange}
                      >
                        <option value="food">Food</option>
                        <option value="sportequipment">Sport Equipment</option>
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
                className={styles["input-box"]}
                readOnly={!isEditing}
              />
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="설명"
                required
                className={styles["input-box"]}
                readOnly={!isEditing}
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="가격"
                required
                className={styles["input-box"]}
                readOnly={!isEditing}
              />
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="수량"
                required
                className={styles["input-box"]}
                readOnly={!isEditing}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {isEditing ? (
                  <>
                    <button
                      type="submit"
                      className={styles.addButton}
                      style={{ marginRight: "10px" }}
                    >
                      수정 완료
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                      className={styles.backbutton}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleUpdate}
                      className={styles.addButton}
                      style={{ marginRight: "10px" }}
                    >
                      정보 수정
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className={styles.deletebutton}
                      style={{ marginRight: "10px" }}
                    >
                      삭제
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalOpen(false);
                        setIsEditing(false);
                      }}
                      className={styles.backbutton}
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