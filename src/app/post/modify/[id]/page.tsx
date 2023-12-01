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
        alert("게시글이 성공적으로 수정되었습니다.");
        window.location.href = `/post/detail/${props.params.id}`;
      } else {
        alert("게시글 수정에 실패하였습니다.");
      }
    }
  };

  return (
    <form onSubmit={(e: any) => handleSubmit(e)}>
      <h4>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요."
          style={{
            width: "100%",
            height: "30px",
            fontSize: "16px",
            padding: "5px",
            borderRadius: "10px",
          }}
        />
      </h4>
      {/* <input
        type="checkbox"
        checked={isNotice}
        onChange={(e) => setIsNotice(e.target.checked)}
      />{" "}
      공지글
      <br /> */}
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요."
        style={{
          width: "100%",
          height: "200px",
          fontSize: "16px",
          padding: "5px",
          borderRadius: "10px",
        }}
      />
      <br />
      <button type="submit" className={styles.addButton} style={{ marginRight: "10px" }}>게시글 수정</button>
      <button
        type="button"
        onClick={() => router.push(`/post/detail/${props.params.id}`)}
        className={styles.backbutton}
      >
        수정 취소
      </button>
    </form>
  );
}
