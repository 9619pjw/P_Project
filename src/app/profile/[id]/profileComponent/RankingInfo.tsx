// import Image from "next/image";

// type UserJSON = {
//   userId: number;
//   nickname: string;
//   introduction: string | null;
//   area: string;
//   imageUrl: string | null;
//   tier?: string;
//   rating?: number;
//   win: number;
//   lose: number;
//   draw: number;
//   winRate: number | undefined | null;
// };

// type ProfileProps = {
//   userJSON: UserJSON;
// };

// export default function RankingInfo({ userJSON }: ProfileProps) {
//   let userData = userJSON;

//   return (
//     <div
//       className="rankingInfo"
//       style={{ display: "flex", margin: "20px 0 0 0" }}
//     >
//       <Image src="/profile-rank.png" alt="rank" width={190} height={190} />
//       <div
//         className="rankingInfoText"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           margin: "0 0 0 20px",
//           justifyContent: "center",
//         }}
//       >
//         <h2 style={{ margin: "0 0 10px 0" }}>티어: {userData.tier}</h2>
//         <h2 style={{ margin: "0 0 10px 0" }}>레이팅: {userData.rating}</h2>
//         <h2 style={{ margin: "0 0 10px 0" }}>
//           승무패: {userData.win}/{userData.draw}/{userData.lose}
//         </h2>
//         <h2 style={{ margin: "0 0 10px 0" }}>승률: {userData.winRate}%</h2>
//       </div>
//     </div>
//   );
// }
