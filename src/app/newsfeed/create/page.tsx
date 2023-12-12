"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from 'next/head';

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
    userId : number;
    image: string | File | null;
    title: string;
    content: string;
};

export default function NewsfeedCreatePage({ params }: { params: PageParams }){
    const router = useRouter();
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [feed, setFeed] = useState<FeedInfo>({
        userId: 0,
        image: null,
        title: "",
        content: ""
    });

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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFeed({ ...feed, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFeed({ ...feed, image: file });
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!feed.title || !feed.content) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken"); 

        try {
            const formData = new FormData();

            let CreateFeedRequest = {
                userId: feed.userId,
                title: feed.title,
                content: feed.content,
            };

            formData.append(
                "content",
                new Blob([JSON.stringify(CreateFeedRequest)], {
                    type: "application/json",
                })
            );

            if (feed.image) {
                formData.append("image", feed.image);
            }
            // 데이터 확인
            console.log(formData);
            Array.from(formData.entries()).forEach(([key, value]) => {
                console.log(key, value);
            });

            const response = await fetch("https://funsns.shop:8000/feed-service/feed", {
                method: "POST",
                headers: {
                    "Credentials": "include",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            if (data.code === "SUCCESS") {
                alert(data.message);
                setFeed({ userId: feed.userId, image: "", title: "", content: "" });
                router.push('/newsfeed');
            } else {
                alert("피드 작성에 실패하였습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const localStorage: Storage = window.localStorage;
        const token = localStorage.getItem("accessToken");
        let userId = localStorage.getItem("userId");

        async function getUserInfo() {
            const getUserInfoURL: string = `https://funsns.shop:8000/user-service/user/${userId}`;

            const response = await fetch(getUserInfoURL, {
                method: "GET",
                headers: {
                    "Credentials": "include",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if(response.ok) {
                const responseBody = await response.json();
                console.log("data:");
                console.log(responseBody);
                if (responseBody.code === "SUCCESS") {
                    console.log("사용자 정보를 불러오는데 성공했습니다.");
                    return responseBody.data;
                } else {
                    console.log("사용자 정보를 불러오는데 실패했습니다.");
                }
            } else {
                console.log("서버 요청 실패!");
                throw new Error("서버 요청 실패!");
            }
        }

        async function fetchUserData() {
            let userInfo = await getUserInfo();
            if (userInfo) {
                setData(userInfo);
            }
        }

        fetchUserData();
        setShowUserInfo(true);

        const userIdFromLS = Number(localStorage.getItem("userId"));
        setFeed(prevState => ({ ...prevState, userId: userIdFromLS }));
    }, []);

    return (
        <>
            <Head>
                <title>Create NewsFeed</title>
            </Head>
        <div className="bg-gray-50 container mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="userId" value={feed.userId} />
            <label className="block">
                <span className="text-gray-700">이미지:</span>
                <input type="file" name="image" onChange={handleImageChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
            </label>
            {previewImage && <img src={previewImage} alt="Preview" className="mt-4"/>}
            <label className="block">
                <span className="text-gray-700">제목:</span>
                <input type="text" name="title" value={feed.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>
            <label className="block">
                <span className="text-gray-700">내용:</span>
                <textarea name="content" value={feed.content} onChange={handleChange} className="mt-1 block w-full h-20 rounded-md border-gray-300 shadow-sm"/>
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mb-8">피드 작성</button>
        </form>
    </div>
    </>
    );
}