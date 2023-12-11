"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../Home.module.css";

type UserJSON = {
    userId: number;
    name : string;
    nickname: string;
    introduction: string | null;
    profileImage: string | null | undefined;
    availableFollow : boolean;
    followerCount : number;
    followingCount : number;
};

type PageParams = {
    id: number;
};

type FeedInfo = {
    userId : number; // 작성자 id
    image: string | null; // 이미지 추가
    title: string; // 피드 제목
    content: string; // 피드 내용
};

export default function NewsfeedCreatePage({ params }: { params: PageParams }){
    const [showUserInfo, setShowUserInfo] = useState(false);

    let userJSON: UserJSON = {
        userId: 0,
        name:".",
        nickname: "default",
        introduction: "",
        profileImage: "/default-profile.png",
        availableFollow : true,
        followerCount : 0,
        followingCount : 0,
    };
    const [data, setData] = useState<UserJSON>(userJSON);
    // TODO: GET - id에 맞는 사용자 정보 가져오기
    
    async function getUserInfo() {
    // 로컬스토리지 토큰 가져오기
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        let userId = params.id;
    // 요청 URL - PathVariable: userId
        const getUserInfoURL: string = `https://funsns.shop:8000/user-service/user/${userId}`;

        const response = await fetch(getUserInfoURL, {
            method: "GET",
            headers: {
                "Credentials": "include",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
    .then((res) => res.json())
    .then((data) => {
        console.log("data:");
        console.log(data);
        if (data.code === "SUCCESS") {
            console.log("사용자 정보를 불러오는데 성공했습니다.");
        } else {
            console.log("사용자 정보를 불러오는데 실패했습니다.");
        }
        return data;
    })
    .catch((error) => {
        console.log(error);
        throw new Error("서버 요청 실패!");
    });

    // 응답값 확인
    let body: UserJSON;
    if (response) {
        // data부분만 가져오기
        body = await response.data;
        console.log("body:");
        console.log(body);
        return body;
    } else {
        console.log("응답이 없습니다.");
        return null;
    }
    }

    useEffect(() => {
        async function fetchUserData() {
        let userInfo = await getUserInfo();
        if (userInfo) {
            console.log("userInfo:");
            console.log(userInfo);
            setData(userInfo);
            console.log("data:");
            console.log(data);
        }
        }
    fetchUserData();
    setShowUserInfo(true);
    }, []);

    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    let userId = params.id;


    const [feed, setFeed] = useState<FeedInfo>({
        userId: userId,
        image: "",
        title: "",
        content: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFeed({ ...feed, image: reader.result as string });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!feed.userId || !feed.title || !feed.content || !feed.image) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("user-id", String(feed.userId));
        formData.append("content", JSON.stringify({ title: feed.title, content: feed.content }));
        formData.append("image", feed.image);

        try {
            const response = await fetch("https://funsns.shop:8000/feed-service/feed", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (data.code === "SUCCESS") {
                alert(data.message);
                setFeed({ userId: userId, image: "", title: "", content: "" });
            } else {
                alert("피드 작성에 실패하였습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={feed.userId} />
                <label>
                    제목:
                    <input type="text" name="title" value={feed.title} onChange={handleChange} />
                </label>
                <br />
                <br />
                <label>
                    내용: <textarea name="content" value={feed.content} onChange={handleChange} />
                </label>
                <br />
                <br />
                <label>
                    이미지:
                    <input type="file" name="image" onChange={handleImageChange} />
                </label>
                <br />
                {feed.image && <img src={feed.image} alt="Preview" />}
                <br />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mb-8">피드 작성</button>
            </form>
        </div>
    );
}