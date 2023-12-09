type UserJSON = {
  userId: number;
  name : string;
  nickname: string;
  profileImage: string | null | undefined;
  introduction: string | null;
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
    <div className="flex flex-col items-center mt-5">
      <div className="flex justify-center">
        <img
          className="rounded-full"
          src={userData.profileImage ? userData.profileImage : "/default-profile.png"}
          alt="profile"
          width={200}
          height={200}
        />
      </div>
      <div className="text-center">
        <div className="flex justify-center items-center space-x-4">
          <h1 className="font-bold text-xl">{userData.nickname}</h1>
        </div>
        <div className="flex justify-center mb-5">
          {userData.introduction}
        </div>
        <div className="flex justify-center mb-5">
          {userData.followerCount}
        </div>
        <div className="flex justify-center mb-5">
          {userData.followingCount}
        </div>
      </div>
    </div>
  );
}
