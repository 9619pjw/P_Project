"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../Home.module.css";

// 게시글 정보를 담는 타입 정의
type Post = {
  id: number;
  subject: string;
  isNotice: boolean;
  author: string;
  createDate: string;
};

export default function PostNotice() {
  const [notices, setNotices] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  //const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  
  const handleGoBack = () => {
    window.location.href = "/post/list";
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://withsports.site/post/notices");
      const data = await response.json();

      // 공지 게시글 정보만을 추출하여 가공
      const fetchedNotices: Post[] = data.data.notices.map((notice: any) => ({
        id: notice.id,
        subject: notice.subject,
        isNotice: notice.isNotice,
        author: notice.author.username,
        createDate: new Date(notice.createDate).toLocaleString(),
      }));


      // 가공한 데이터를 상태에 저장
      setNotices(fetchedNotices);
      setTotalPages(data.data.paging.totalPages);
    };

    fetchData();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-4">공지사항</h3>
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제목
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작성자
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작성일자
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={`/post/detail/${notice.id}`} className="text-sm text-gray-900">
                  {notice.subject}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{notice.author}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {notice.createDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
          뒤로가기
        </button>
      </div>
    </div>
    // <div>
    //   <br/>
    //   <h3>공지사항</h3>
    //   <table className={styles.postTable}>
    //     <thead>
    //       <tr>
    //         <th>제목</th>
    //         <th>작성자</th>
    //         <th>작성일자</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {notices.map((notice) => (
    //         <tr key={notice.id}>
    //           <td>
    //             <h5>
    //               <style jsx>{`a { color: inherit; text-decoration: none;}`}</style>
    //               <a href={`/post/detail/${notice.id}`}>{notice.subject}</a>
    //             </h5>
    //           </td>
    //         <td>{notice.author}</td>
    //         <td>{notice.createDate}</td>
    //         <hr />
    //       </tr>
    //     ))}
    //     </tbody>
    //   </table>
    //   <button onClick={handleGoBack} className={styles.backbutton}>
    //         뒤로가기
    //   </button>
    // </div>
  );
}

