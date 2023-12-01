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
        alert("게시글이 성공적으로 등록되었습니다.");
        router.push("/post/list");
      } else {
        alert("게시글 등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }

  };

  // 뒤로 가기 버튼
  const handleGoBack = (e: React.MouseEvent) => {
    e.preventDefault(); // 댓글 폼 제출 막기
    window.location.href = "/post/list";
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        {" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
          style={{width: '100%', height: '30px', fontSize: '16px', padding: '5px',  borderRadius:'10px'}}
        />
      </h4>
      {/* <input
        type="checkbox"
        checked={isNotice}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setIsNotice(e.target.checked)
        }
      />{" "}
      공지글 */}
      {/* <br /> */}
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요."
        style={{width: '100%', height: '200px', fontSize: '16px', padding: '5px', borderRadius:'10px'}} 
      />
      <br />
      <button type="submit" className={styles.addButton} style={{ marginRight: "10px" }}>등록하기</button>
      <button onClick={handleGoBack} className={styles.backbutton}> 뒤로 가기 </button>
    </form>
  );
}