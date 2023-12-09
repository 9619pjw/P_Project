import Image from "next/image";
// 사용자 닉네임 검색결과 저장
type SearchNameUser = {
  userId: number;
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

export default function ShowSearchList({ searchNameResult }: SearchNameProps ) {
  return (
    <div className="text-center">
    <h1 className="font-bold text-xl mb-2">검색결과</h1>
    <p className="mb-4">프로필 이미지를 누르면 해당 프로필로 이동합니다.</p>
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <span className="font-bold">검색 결과</span>
      </div>
      <div className="flex justify-evenly mb-2">
        <span>사진</span>
        <span>이름</span>
        <span>자기소개</span>
      </div>
      {searchNameResult.data.map((user) => (
        <div key={user.userId} className="flex justify-between w-full py-4 items-center">
          <div
            className="cursor-pointer mx-2"
            onClick={() => {
              window.location.href = `https://funs.vercel.app/profile/${user.userId}`;
            }}
          >
            <Image
              src={user.profileImage ? user.profileImage : "/default-profile.png"}
              alt="profileImage"
              width={40}
              height={40}
            />
          </div>
          <span className="mx-2">{user.nickname}</span>
          <span className="mx-2">{user.introduction}</span>
        </div>
      ))}
    </div>
  </div>
    // <div>
    //   <h1>검색결과</h1>
    //   <p>프로필 이미지를 누르면 해당 프로필로 이동합니다.</p>
    //   <table align="center">
    //     <tr>
    //       <p>
    //         <td>검색 결과</td>
    //       </p>
    //     </tr>
    //     <tr>
    //       <td>사진 </td>
    //       <td>이름</td>
    //       <td>자기소개</td>
    //     </tr>
    //     {searchNameResult.data.map((user) => (
    //       <div key={user.userId}>
    //         <tr
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             padding: "15px",
    //             alignItems: "center",
    //           }}
    //         >
    //           <td>
    //           <div
    //               style={{ margin: "0 10px" }}
    //               onClick={() => {
    //                 window.location.href = `https://funs.vercel.app/profile/${user.userId}`;
    //               }}
    //             >
    //             <Image
    //               src={user.profileImage ? user.profileImage : "/default-profile.png"}
    //               alt="profileImage"
    //               width={40}
    //               height={40}
    //             />
    //             </div>
    //           </td>
    //           <td>
    //             <h3 style={{ margin: "0 10px" }}>{user.nickname}</h3>
    //           </td>
    //           <td>
    //             <h3 style={{ margin: "0 10px" }}>{user.introduction}</h3>
    //           </td>
    //         </tr>
    //       </div>
    //     ))}
    //   </table>
    // </div>
  );
}