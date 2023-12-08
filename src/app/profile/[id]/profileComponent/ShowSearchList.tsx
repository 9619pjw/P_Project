import Image from "next/image";
// 사용자 닉네임 검색결과 저장
type SearchNameUser = {
  id: number;
  nickname: string;
  introduction: string | null;
  profileImage: string | null | undefined;
};

type SearchNameList = {
  data: SearchNameUser[];
};

type SearchNameProps = {
  searchNameResult: SearchNameList;
};

export default function ShowSearchList(searchNameResult : SearchNameProps) {
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
          <td>자기소개</td>
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
              <div
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    window.location.href = `/profile/${user.id}`;
                  }}
                >
                <Image
                  src={user.profileImage ? user.profileImage : "/default-profile.png"}
                  alt="profileImage"
                  width={40}
                  height={40}
                />
                </div>
              </td>
              <td>
                <h3 style={{ margin: "0 10px" }}>{user.nickname}</h3>
              </td>
              <td>
                <h3 style={{ margin: "0 10px" }}>{user.introduction}</h3>
              </td>
            </tr>
          </div>
        ))}
      </table>
    </div>
  );
}
