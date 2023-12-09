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
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">검색결과</h1>
      <p className="mb-4">프로필 이미지를 누르면 해당 프로필로 이동합니다.</p>
      <div className="w-full border-collapse">
        <div className="flex justify-between bg-gray-500 text-black px-2 py-1">
          <span>사진</span>
          <span>이름</span>
          <span>자기소개</span>
        </div>
        {searchNameResult.data.map((user, index) => (
          <div key={user.userId} className={`flex justify-between w-full py-4 items-center ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
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
  );
}