"use client";

type ExportUserInfoProps = {
    image: string | null;
    nickname: string;
    validName: boolean;
    introduction : string | null;
    userType : string;
};

export default function ExportUserInfoProps(props: ExportUserInfoProps) {
    const { image, nickname, validName, introduction } = props;

    // 회원정보 제출
    async function sendForm() {
    // TODO: 회원정보 제출 fetch 구현하기

    // 회원정보 제출 API
    const url = "https://funsns.shop:8000/user-service/user/profile";

    // 액세스 토큰 가져오기
    const localStorage: Storage = window.localStorage;
    const token = localStorage.getItem("accessToken");
    console.log(token);
    console.log(JSON.stringify(`Bearer ${token}`));
    console.log(JSON.stringify({ nickname, introduction }));
    const userId = localStorage.getItem("userId");

     // FormData 객체 생성
    const formData = new FormData();
    formData.append("updateProfile", new Blob([JSON.stringify({ nickname: nickname, introduction: introduction })], {type: "application/json"}));
    if (image) {
        formData.append("image", image);
    }

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Credentials: "include",
            Authorization: `Bearer ${token}`,
        },
        body: formData,
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