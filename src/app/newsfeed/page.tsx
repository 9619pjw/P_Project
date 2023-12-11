
import { useInView } from "react-intersection-observer"
import Link from "next/link";

export default function NewsfeedPage(){
    return (
        <>
            뉴스피드 페이지 (리스트 화면 수정 예정)
            <br />
            <Link href="/newsfeed/create">
                <button className="px-4 py-2 bg-blue-500 text-white rounded mb-8">
                    피드 생성
                </button>
            </Link>
        </>
    );
}