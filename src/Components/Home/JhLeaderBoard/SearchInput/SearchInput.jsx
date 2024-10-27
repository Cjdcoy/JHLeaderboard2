import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import leaderBoardData from "src/Data/leaderboards.json";
import { getFpsNumber } from "src/Functions/helper";
import s from "./SearchInput.module.scss";

const SearchInput = ({ setLeaderBoard, activeFps }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inpValue, setInpValue] = useState(searchParams.get("player") || "");

  function handleOnChange(e) {
    const searchQuery = e?.target?.value;

    setInpValue(searchQuery);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      player: searchQuery,
    });

    setLeaderBoard(getFilterLeaderBoard(searchQuery, activeFps));
  }

  return (
    <form className={s.searchInputWrapper} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={inpValue}
        onChange={handleOnChange}
        placeholder="Search for player name"
      />
    </form>
  );
};
export default SearchInput;

export function getFilterLeaderBoard(searchQuery, activeFps) {
  activeFps = getFpsNumber(activeFps);

  const playersNames = Object.keys(leaderBoardData[activeFps]);
  const filteredPlayersNames = playersNames.filter((playerName) =>
    playerName.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const filteredCurrentFpsData = filteredPlayersNames.reduce(
    (acc, playerName) => {
      acc[playerName] = leaderBoardData[activeFps][playerName];
      return acc;
    },
    {}
  );

  return {
    ...leaderBoardData,
    [activeFps]: filteredCurrentFpsData,
  };
}
