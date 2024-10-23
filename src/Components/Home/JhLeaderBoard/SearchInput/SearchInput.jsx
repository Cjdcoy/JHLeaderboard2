import { useState } from "react";
import leaderBoardData from "src/Data/leaderboards.json";
import s from "./SearchInput.module.scss";

const SearchInput = ({ setLeaderBoard, activeFps }) => {
  const [inpValue, setInpValue] = useState("");

  function handleOnChange(e) {
    const searchQuery = e.target.value;
    setInpValue(searchQuery);

    const playersNames = Object.keys(leaderBoardData[activeFps]);
    const filteredPlayersNames = playersNames.filter((playerName) =>
      playerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCurrentFpsData = filteredPlayersNames.reduce(
      (acc, playerName) => {
        acc[playerName] = leaderBoardData[activeFps][playerName];
        return acc;
      },
      {}
    );

    const filteredLeaderBoard = {
      ...leaderBoardData,
      [activeFps]: filteredCurrentFpsData,
    };

    setLeaderBoard(filteredLeaderBoard);
  }

  return (
    <form className={s.searchInputWrapper}>
      <input
        type="text"
        value={inpValue}
        onChange={handleOnChange}
        placeholder="Player search..."
      />
    </form>
  );
};
export default SearchInput;
