import { useState } from "react";
import leaderBoardData from "../../../Data/leaderboards.json";
import s from "./JhLeaderBoard.module.scss";

const JhLeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState(leaderBoardData);
  const leaderBoardKeys = Object.keys(leaderBoard);

  return (
    <section className={s.leaderBoardSection}>
      {leaderBoardKeys.map((key, index) => {
        const playersNames = Object.keys(leaderBoard[key]);
        const leaderboardTitle =
          key === "0" ? "Mix" : key === "999" ? "All" : key;
        const scores = playersNames
          .map((playerName) => leaderBoard[key][playerName].Score)
          .sort((a, b) => b - a);

        return (
          <div className={s.leaderboardWrapper} key={`${index}-${key}`}>
            <h2>{leaderboardTitle}</h2>

            <table className={s.leaderBoardTable}>
              <thead className={s.leaderBoardHead}>
                <tr>
                  <th>Rank</th>
                  <th>Player Name</th>
                  <th>Score</th>
                  <th>Tops 1 - 10</th>
                </tr>
              </thead>

              <tbody className={s.leaderBoardBody}>
                {playersNames.map((playerName, index) => {
                  const places = leaderBoard[key][playerName].Places.join(", ");

                  return (
                    <tr key={`${playerName}-${index}-${key}`}>
                      <td>{index + 1}</td>
                      <td>{playerName}</td>
                      <td>{leaderBoard[key][playerName].Score}</td>
                      <td>[{places}]</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </section>
  );
};
export default JhLeaderBoard;

// {leaderBoardKeys.map((key) => {
//   const playersNames = Object.keys(leaderBoard[key]);
//   return <td key={key}>{playersNames}</td>;
// })}
