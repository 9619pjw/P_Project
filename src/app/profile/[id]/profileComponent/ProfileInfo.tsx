type UserJSON = {
  userId: number;
  name : string;
  nickname: string;
  profileImage: string | null | undefined;
  introduction: string | null;
  availableFollow : boolean;
  followerCount : number;
  followingCount : number;
};

type ProfileProps = {
  userJSON: UserJSON;
};

export default function Profile({ userJSON }: ProfileProps) {
  
  console.log("userJSON:");
  console.log(userJSON);
  let userData = userJSON;

  return (
    <div className="bg-gray-100 container mx-auto px-4 py-8 flex flex-col items-center">
      <div className="flex justify-center">
        <img
          className="rounded-full border-2 border-blue-500"
          src={userData.profileImage ? userData.profileImage : "/default-profile.png"}
          alt="profile"
          width={200}
          height={200}
        />
      </div>
      <div className="text-center bg-blue-100 p-5 rounded mt-5">
        <div className="flex justify-center items-center space-x-4">
          <h1 className="font-bold text-2xl text-blue-800">{userData.nickname}</h1>
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          {userData.introduction}
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          팔로워 수: {userData.followerCount}
        </div>
        <div className="flex justify-center mb-5 text-blue-600">
          팔로잉 수: {userData.followingCount}
        </div>
      </div>
    </div>
  );
}
