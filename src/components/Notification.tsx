"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import ModalCustom from "./ModalCustom";
import ReadNotification from "./ReadNotification";

type NotificationResponse = {
  code: string;
  message: string;
  data: {
    notifications: Notification[];
  };
};

type Notification = {
  id: number;      // 알림 아이디
  userId : number; // 사용자 아이디
  message: string; // 알림 메시지
  title: string;   // 알림 제목
  readYn: boolean; // 읽음 여부
  createdAt: string; // 생성 날짜
};

type NotificationCountResponse = {
  code: string;
  message: string;
  data: number;
};

// TODO: 알림 기능 구현
export default function Notification() {
  // 알림 갯수 state
  const [notificationCount, setNotificationCount] = useState(0);

  // 알림 모달 보여주는 state
  const [showNotification, setShowNotification] = useState(false);

  // 알림 리스트 state
  const [notificationList, setNotificationList] = useState<Notification[]>([]);

  // TODO: 알림 fetch
  async function getNotification() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 알림 가져오기 API
    const getNotificationURL = `https://funsns.shop:8000/notification-service/notifications`;

    const response = await fetch(getNotificationURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: NotificationResponse) => {
        if (data.code === "SUCCESS") {
          console.log("알림 목록 data:");
          console.log(data);
          setNotificationList(data.data.notifications);
        }
        // TODO: 토큰 만료되었을 때 예외처리하기
        else {
          console.log("알림 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // TODO: 알림 갯수 fetch
  async function countNotification() {
    // 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");

    // 알림 가져오기 API
    const countNotificationURL = `https://funsns.shop:8000/notification-service/notification/counts`;

    const response = await fetch(countNotificationURL, {
      method: "GET",
      headers: {
        Credentials: "include",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: NotificationCountResponse) => {
        if (data.code === "SUCCESS") {
          console.log("알림 개수 응답 data:");
          console.log(data);
          setNotificationCount(data.data);
        }
        // TODO: 토큰 만료되었을 때 예외처리하기
        else {
          console.log("알림 정보를 가져오는데 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getNotification();
    countNotification();
  }, []);

  return (
    <>
      <Badge badgeContent={notificationCount} color="error" style={{display: "block"}}>
        <div>
          <Image
            src="/bell.png"
            width={50}
            height={50}
            alt="bell-image"
            style={{ margin: "0 10px" }}
            onClick={() => setShowNotification(true)}
          />
        </div>
      </Badge>
      <ModalCustom show={showNotification} setShow={setShowNotification}>
    <h1 className="text-4xl font-bold mb-2">알림</h1>
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">번호</th>
          <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">제목</th>
          <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">메시지</th>
          <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">날짜</th>
          <th className="border-b border-gray-300 text-center px-2 py-1 bg-gray-500 text-black">읽음</th>
        </tr>
      </thead>
      <tbody>
        {notificationList.map((notification, index) => (
          <tr key={notification.id} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
            <td className="border-b border-gray-300 text-center px-2 py-1">{notification.id}</td>
            <td className="border-b border-gray-300 text-center px-2 py-1">{notification.title}</td>
            <td className="border-b border-gray-300 text-center px-2 py-1">{notification.message}</td>
            <td className="border-b border-gray-300 text-center px-2 py-1">{notification.createdAt}</td>
            <td className="border-b border-gray-300 text-center px-2 py-1 flex items-center justify-center">
            <ReadNotification notificationId={notification.id} readYn={notification.readYn} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </ModalCustom>
    </>
  );
}
