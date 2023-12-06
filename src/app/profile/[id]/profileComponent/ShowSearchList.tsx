import Image from "next/image";
// 사용자 닉네임 검색결과 저장
type SearchNameUser = {
  id: number;
  nickname: string;
  introduction: string | null;
  profileImage: string | null;
};

type SearchNameList = {
  data: SearchNameUser[];
};

type SearchNameProps = {
  searchNameResult: SearchNameList;
};

export default function ShowSearchList(searchNameResult: SearchNameProps) {
  return (
    <div>
      <h1>검색결과</h1>
      <p>프로필 이미지를 누르면 해당 프로필로 이동합니다.</p>
      <table align="center">
        <tr>
          <p>
            <td>검색 결과</td>
          </p>
        </tr>
        <tr>
          <td>사진 </td>
          <td>이름</td>
          <td>지역</td>
        </tr>
        {searchNameResult.searchNameResult.data.map((user) => (
          <div key={user.id}>
            <tr
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                alignItems: "center",
              }}
            >
              <td>
                <Image
                  src={user.profileImage || "/default-profile.png"}
                  alt="profileImage"
                  width={40}
                  height={40}
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    window.location.href = `/user/profile/${user.id}`;
                  }}
                />
              </td>
              <td>
                <h3 style={{ margin: "0 10px" }}>{user.nickname}</h3>
              </td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
}
