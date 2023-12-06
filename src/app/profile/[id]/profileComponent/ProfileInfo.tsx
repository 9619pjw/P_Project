type UserJSON = {
  userId: number;
  nickname: string;
  introduction: string | null;
  imageUrl: string | null | undefined;
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
          src={userData.imageUrl ? userData.imageUrl : "/default-profile.png"}
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
      </div>
    </div>
  );
}
