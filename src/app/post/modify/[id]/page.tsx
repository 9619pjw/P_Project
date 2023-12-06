"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../Home.module.css";

type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
};

type ReadProps = {
  params: {
    id: number;
  };
};

export default function ModifyPost(props: ReadProps) {
  const [title, setTitle] = useState("");
  const [isNotice, setIsNotice] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname; // 페이지 경로 가져오기
    const postId = path.split('/')[3]; // 페이지 경로에서 게시글 ID 가져오기
  
    if (postId) {
      fetch(`https://withsports.site/post/detail/${props.params.id}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.subject);
          setIsNotice(data.isNotice);
          setContent(data.content);
        });
    }
  }, []);

  const handleSubmit = async (e : any) => {
    e.preventDefault();
  
    const path = window.location.pathname; // 페이지 경로 가져오기
    const postId = path.split('/')[3]; // 페이지 경로에서 게시글 ID 가져오기
  
    if (postId) {
      // 서버에 수정 내용 전송
      const response = await fetch(`https://withsports.site/post/modify/${props.params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: title,
          isNotice: isNotice,
          content: content,
          name: "testid2",
        }),
      });
  
      const responseData = await response.json();
  
      if (responseData.code === '0') {
        alert("질문글이 성공적으로 수정되었습니다.");
        window.location.href = `/post/detail/${props.params.id}`;
      } else {
        alert("질문글 수정에 실패하였습니다.");
      }
    }
  };

  return (
    <div className="bg-gray-50 container mx-auto px-4 py-8">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">질문글 수정</h1>
      <form onSubmit={(e: any) => handleSubmit(e)}>
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">질문글 수정</button>
          <button
            type="button"
            onClick={() => router.push(`/post/detail/${props.params.id}`)}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
          >
            수정 취소
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
