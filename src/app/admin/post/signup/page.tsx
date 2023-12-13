"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../Home.module.css";

type User = {
    username : string;  // id 입력 
    password1 : string; // 비밀번호 입력
    password2 : string; // 비밀번호 확인 입력
    email : string;     // 이메일 입력
}

export default function PostSignUp() {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleGoBack = () => {
      window.location.href = "/post/list";
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!username || !password1 || !password2 || !email) {
        alert("모든 필드를 입력해 주세요.");
        return;
      }

      if (password1 !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
  
      const data = {
        username: username,
        password1: password1,
        password2: password2,
        email: email,
      };
  
      try {
        const response = await fetch("https://withsports.site/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          throw new Error("Signup request failed");
        }
        
        const responseData = await response.json();
        console.log(responseData);

        // 회원가입 성공 시, 로그인 페이지로 이동
        alert("회원가입이 완료되었습니다.");
        router.push("/admin/post/login");
      } catch (error) {
        alert("이미 존재하는 회원입니다.")
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div>
        <div className="p-5 bg-gray-200 rounded-md shadow-md">
        {/* <div className={styles.signupForm}> */}
        <h2> Q&A 게시판 회원가입 </h2>
        <form onSubmit={handleSubmit} className={styles.formFields}>
          게시판 닉네임 : <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          비밀번호 : <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="password1"
          />
          비밀번호 확인 :<input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="password2"
          />

          Email : <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <button type="submit" className={styles.addButton}>가입 신청</button>
          <button type="button" onClick={handleGoBack} className={styles.goBackButton}>뒤로가기</button>
        </form>
        </div>
      </div>
    );
  }