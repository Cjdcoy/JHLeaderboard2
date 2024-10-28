import s from "./JhLeaderBoardTable.module.scss";

const JhLeaderBoardTable = ({ data, keyName }) => {
  const playersNames = Object.keys(data);
  const leaderboardTitle =
    keyName === "0" ? "Mix" : keyName === "999" ? "All" : keyName;
  const scores = playersNames
    .map((playerName) => data[playerName].Score)
    .sort((a, b) => b - a);

  return (
    <div className={s.leaderboardWrapper}>
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
            const places = data[playerName].Places.join(", ");
            const rank = index + 1;
            const rankNoun =
              rank === 1
                ? "1st"
                : rank === 2
                ? "2nd"
                : rank === 3
                ? "3rd"
                : rank;

            return (
              <tr key={`${playerName}-${index}`}>
                <td data-label="Rank">{rankNoun}</td>
                <td data-label="Player Name">{playerName}</td>
                <td data-label="Score">{data[playerName].Score}</td>
                <td data-label="Tops 1 - 10">
                  <span className={s.bracket}>[</span>
                  {places}
                  <span className={s.bracket}>]</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default JhLeaderBoardTable;
