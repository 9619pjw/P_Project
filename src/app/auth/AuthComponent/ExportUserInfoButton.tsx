"use client";

type ExportUserInfoProps = {
    // TODO : 프로필 사진 필요
    nickname: string;
    validName: boolean;
    area : string; // TODO : 자기 소개 문구로 변경 필요
};

export default function ExportUserInfoProps(props: ExportUserInfoProps) {
    const { nickname, validName, area } = props;

    // 회원정보 제출
    async function sendForm() {
    // TODO: 회원정보 제출 fetch 구현하기

    // 회원정보 제출 API
    const url = "https://funsns.shop:8000/user-service/signup/profile";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    console.log(JSON.stringify(`Bearer ${token}`));
    console.log(JSON.stringify({ nickname, area }));
    console.log(JSON.stringify({ nickname: nickname, area: area }));
    const userId = localStorage.getItem("userId");

    let res = await fetch(url, {
        method: "PUT",
        headers: {
            'Credentials': "include",
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname: nickname, area: area }),
        }).then((res) => {
            if (res.status === 200) {
                alert("회원가입에 성공했습니다.");
                location.href = "/";
                console.log(res);
            } else {
                alert("회원가입에 실패했습니다.");
                console.log(res);
            }
        });
    }
    
    return (
        <div>
            {validName ? (
                <button onClick={sendForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    회원 정보 제출
                </button>
            ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>
                    회원 정보 제출
                </button>
            )}
        </div>
    );
}