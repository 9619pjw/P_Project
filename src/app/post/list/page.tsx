"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../Home.module.css";

// 게시글 정보 타입
type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
  voter: string[];
};

export default function PostList() {
  const [notices, setNotices] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 관리
  const [keyword, setKeyword] = useState(""); // 검색 엔진
  const [popularPosts, setPopularPosts] = useState<Post[]>([]); // 인기 게시글

  // 페이지 번호를 관리
  const [page, setPage] = useState(0);

  // 검색어 입력 처리
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // 검색 처리
  const handleSearch = async () => {
    const response = await fetch(
      `https://withsports.site/post/list?keyword=${keyword}`
    );
    const data = await response.json();

    const fetchedPosts: Post[] = data.data.paging.content.map((post: any) => ({
      id: post.id,
      subject: post.subject,
      isNotice: post.isNotice,
      author: post.author.username,
      createDate: new Date(post.createDate).toLocaleString(),
    }));

    // setNotices(fetchedNotices);
    setPosts(fetchedPosts);
    setTotalPages(data.data.paging.totalPages);
  };

  // 페이지 이동 처리 함수
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    const fetchPopularPosts = async () => {
      let response = await fetch(`https://withsports.site/post/list?page=0`);
      let data = await response.json();

      let allPosts = [...data.data.paging.content]; // 첫 페이지 게시글 저장
      let totalPages = data.data.paging.totalPages; // 전체 페이지 수

      // 2번째 페이지부터 마지막 페이지까지 순회
      for (let i = 1; i < totalPages; i++) {
        response = await fetch(`https://withsports.site/post/list?page=${i}`);
        data = await response.json();
        allPosts = [...allPosts, ...data.data.paging.content]; // 각 페이지의 게시글을 allPosts에 추가
      }

      // 인기 게시글 정보 가공
      const fetchedPopularPosts: Post[] = allPosts
        .filter((post: any) => post.voter.length >= 2) // 추천 수가 5 이상인 게시글만 선택
        .map((post: any) => ({
          id: post.id,
          subject: post.subject,
          isNotice: post.isNotice,
          author: post.author.username,
          createDate: new Date(post.createDate).toLocaleString(),
          voter: post.voter,
        })).slice(0, 3);

      setPopularPosts(fetchedPopularPosts);
    };

    const fetchPosts = async () => {
      const response = await fetch(
        `https://withsports.site/post/list?page=${page}`
      );
      const data = await response.json();

      // 공지 게시글 정보 가공
      const fetchedNotices: Post[] = data.data.notices
        .map((notice: any) => ({
          id: notice.id,
          subject: notice.subject,
          isNotice: notice.isNotice,
          author: notice.author.username,
          createDate: new Date(notice.createDate).toLocaleString(),
        }))
        .sort((a: Post, b: Post) => b.createDate.localeCompare(a.createDate))
        .slice(0, 3);

      // 일반 게시글 정보 가공
      const fetchedPosts: Post[] = data.data.paging.content.map(
        (post: any) => ({
          id: post.id,
          subject: post.subject,
          isNotice: post.isNotice,
          author: post.author.username,
          createDate: new Date(post.createDate).toLocaleString(),
        })
      );

      setNotices(fetchedNotices);
      setPosts(fetchedPosts);
      setTotalPages(data.data.paging.totalPages);

      // 로그인 여부 확인
      const savedLoginState = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(savedLoginState === "true");
    };

    fetchPopularPosts();
    fetchPosts();
  }, [page]);

  // 로그아웃 함수
  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col justify-around mb-5">
      <br />
      <div>
      {isLoggedIn ? (
        //  <button onClick={handleLogout} className={styles.loginButton} style={{ marginRight: "10px" }}>
        <button onClick={handleLogout} className="border border-gray-300 bg-grey-500 text-black px-2 py-1 rounded-md cursor-pointer">  
          Logout
        </button>
      ) : (
        <>
          <Link href="/post/login">
            {/* <button className={styles.loginButton} style={{ marginRight: "10px" }}> */}
            <button className="border border-gray-300 bg-grey-500 text-black px-2 py-1 rounded-md cursor-pointer">
              Login
            </button>
          </Link>
          &nbsp;&nbsp;
          <Link href="/post/signup">
          <button className="border border-gray-300 bg-grey-500 text-black px-2 py-1 rounded-md cursor-pointer">
              Signup
            </button>
          </Link>
        </>
      )}
      <br />
      <br />
      <div className="flex justify-between">
        <Link href="/post/create">
          <button className="bg-black text-white border border-gray-300 px-2 py-1 rounded-md cursor-pointer h-10">
            질문글 등록하기
          </button>
        </Link>
        <div>
          <input
            className="border border-gray-300 p-2 w-48 ml-2 rounded h-10"
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={handleKeywordChange}
          />
          {/* <button className={styles.searchButton} onClick={handleSearch} style={{ marginLeft: "10px" }}> */}
          <button className="border border-gray-300 bg-grey-500 text-black px-2 py-1 rounded-md cursor-pointer ml-2 h-10" onClick={handleSearch}>
            Search
          </button>
        </div>
        </div>
      </div>
      {/* <ul className={styles.noticeList}> */}
      <br />
      <ul className="w-9/10 bg-gray-100 p-5 rounded-md">
        <Link
          href="/post/notices"
          style={{ color: "black", textDecoration: "none", fontSize: "Large" }}
        >
          공지사항
        </Link>
        {notices.map((notice) => (
          <div key={notice.id}>
            <h5>
              <style jsx>{`a { color: inherit; text-decoration: none;}`}</style>
              <a href={`/post/detail/${notice.id}`}>{notice.subject}</a>
            </h5>
            <small style={{ textAlign: "right" }}>
              작성일자: {notice.createDate}
            </small>
            <hr />
          </div>
        ))}
      </ul>

      <h3 className="text-xl my-3">자주 묻는 Q&A</h3>
      <div className="w-full bg-gray-200 p-5 my-2 rounded-md">
      {/* <div className={styles.popularList}> */}
        {popularPosts.map((post) => (
          <div key ={post.id} className="flex justify-between mb-2">
           {/* <div key={post.id} className={styles.popularPostItem}> */}
            <style jsx>{`a{ color : black; text-decoration:none; flex-grow: 1;}`}</style>
            <a href={`/post/detail/${post.id}`} className={styles.popularPostLink}>{post.subject}</a>
            <span>추천 수: {post.voter.length}</span>
          </div>
          
        ))}
      </div>

      <h3 className="text-xl my-3">Q&A 게시판</h3>
      <table className="w-full border-collapse mt-5 divide-y divide-gray-200">
  <thead>
    <tr>
      <th className="w-1/2 p-2">제목</th>
      <th className="w-1/4 p-2">작성자</th>
      <th className="w-1/4 p-2">작성일자</th>
    </tr>
  </thead>
  <tbody>
    {posts.map((post) => (
      <tr key={post.id} className="border-b border-gray-200">
        <td className="p-2">
          <style jsx>{`a { color: inherit; text-decoration: none; }`}</style>
          <a href={`/post/detail/${post.id}`}>{post.subject}</a>
        </td>
        <td className="p-2">{post.author}</td>
        <td className="p-2">{post.createDate}</td>
      </tr>
    ))}
  </tbody>
</table>
  <div className="flex justify-center mt-5">
    <nav aria-label="Page navigation">
      <ul className="flex list-none">
        <li className="mx-1">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
            className="px-3 py-2 bg-gray-300 rounded"
          >
            이전
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
        <li key={i} className="mx-1">
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 ${page === i ? 'bg-gray-700 text-white' : 'bg-gray-300'} rounded cursor-pointer transition-colors duration-300 hover:bg-gray-500`}
          >
            {i + 1}
          </button>
        </li>
      ))}
        <li className="mx-1">
        <button onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1} className="px-3 py-2 bg-gray-300 rounded">
          다음
        </button>
        </li>
      </ul>
    </nav>
  </div>
</div>
  );
}