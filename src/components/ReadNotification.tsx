"use client";
import React from "react";
import { Button } from "@mui/material";

type ReadNotificationProps = {
  notificationId: number;
};

export default function ReadNotification({
  notificationId,
}: ReadNotificationProps) {
  // 읽은 여부 상태
  const [isRead, setIsRead] = React.useState(false);

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
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyContent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === "SUCCESS") {
          console.log("읽음 요청 성공");
          setIsRead(true);
        } else {
          console.log("읽음 요청 실패");
        }
      });
  }

  return (
    <>
      {isRead ? (
        <Button variant="outlined" disabled>
          읽음
        </Button>
      ) : (
        <Button variant="outlined" onClick={read}>
          읽음
        </Button>
      )}
    </>
  );
}
