"use client";
import React from "react";

type ReadNotificationProps = {
  notificationId: number;
  readYn: boolean;
};

export default function ReadNotification({
  notificationId,
  readYn,
}: ReadNotificationProps) {
  // 읽은 여부 상태
  const [isRead, setIsRead] = React.useState(readYn);

  // 읽음 요청 fetch
  async function read() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 읽음 요청 API
    const readURL = `https://funsns.shop:8000/notification-service/notification/${notificationId}`;

    type ReadBody = {
      read: boolean;
    };
    const bodyContent:ReadBody = {read:true};

    const response = await fetch(readURL, {
      method: "PUT",
      headers: {
        Credentials: "include",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyContent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "SUCCESS") {
          console.log("읽음 요청 성공");
          setIsRead(true);
          window.location.reload();
        } else {
          console.log("읽음 요청 실패");
        }
      });
  }

  return (
    <>
      {isRead ? (
        <button className="px-4 py-2 bg-transparent text-black rounded" disabled>
          읽음
        </button>
      ) : (
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={read}>
          읽음
        </button>
      )}
    </>
  );
}