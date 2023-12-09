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
    <div
      className="profile"
      style={{ justifyContent: "center", placeItems: "center", marginTop: 20 }}
    >
      <div
        className="profileImage"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={userData.profileImage ? userData.profileImage : "/default-profile.png"}
          alt="profile"
          width={200}
          height={200}
        />
      </div>
      <div className="userInfo" style={{textAlign: "center"}}>
        <div
          className="userNickname"
          style={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h1>{userData.nickname}</h1>
        </div>
        <div
          className="userIntro"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {userData.introduction}
        </div>
        <div
          className="userfollower"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {userData.followerCount}
        </div>
        <div
          className="userfollowing"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {userData.followingCount}
        </div>
      </div>
    </div>
  );
}
