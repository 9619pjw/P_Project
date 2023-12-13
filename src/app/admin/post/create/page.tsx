"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../Home.module.css";

type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
};


export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
        alert('제목은 필수입력입니다.');
        return;
      }
  
    if (content.trim() === '') {
        alert('내용은 필수입력입니다.');
        return;
      }
  
    const loggedInUsername = localStorage.getItem("username");
    
    try {
      const response = await fetch("https://withsports.site/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: title,
          isNotice: isNotice,
          content: content,
          name: loggedInUsername,
        }),
      });

      const responseData = await response.json();

      if (responseData.code === '0') {
        alert("질문글이 성공적으로 등록되었습니다.");
        router.push("/admin/post/list");
      } else {
        alert("질문글 등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }

  };

  // 뒤로 가기 버튼
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault(); // 댓글 폼 제출 막기
    window.location.href = "/admin/post/list";
  };

  return (
    <div className="bg-gray-50 container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">질문글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full px-4 py-2 border rounded"
            placeholder="제목을 입력하세요."
            required
          />
        </div>
        <input
          type="checkbox"
          checked={isNotice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsNotice(e.target.checked)
          }
        />{" "}
        공지글
        <br />
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg mb-2">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field w-full px-4 py-2 border rounded"
            placeholder="내용을 입력하세요."
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">등록하기</button>
          <button type="button" className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded" onClick={handleGoBack}>뒤로 가기</button>
        </div>
      </form>
    </div>
  </div>
  );
}