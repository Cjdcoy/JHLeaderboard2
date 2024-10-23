import { useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import leaderBoardData from "src/Data/leaderboards.json";
import { getFpsNoun, getFpsNumber } from "src/Functions/helper";
import s from "./JhLeaderBoardSection.module.scss";
import JhLeaderBoardTable from "./JhLeaderBoardTable/JhLeaderBoardTable";
import LeaderBoardNav from "./LeaderBoardNav/LeaderBoardNav";
import SearchInput from "./SearchInput/SearchInput";
import { getFilterLeaderBoard } from "./SearchInput/SearchInput";

const JhLeaderBoardSection = () => {
  const [leaderBoard, setLeaderBoard] = useState(leaderBoardData);
  const leaderBoardKeys = Object.keys(leaderBoard);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFps, setActiveFps] = useState(searchParams.get("fps") || "125");
  const activeLeaderBoardData = leaderBoard[getFpsNumber(activeFps)];

  useLayoutEffect(() => {
    const editedActiveFps = getFpsNoun(activeFps);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      fps: editedActiveFps.toLowerCase(),
    });

    setLeaderBoard(
      getFilterLeaderBoard(searchParams.get("player") || "", activeFps)
    );
  }, [activeFps]);

  return (
    <section className={s.leaderBoardSection}>
      <SearchInput
        setLeaderBoard={setLeaderBoard}
        activeFps={getFpsNumber(activeFps)}
      />

      <LeaderBoardNav
        navLinks={leaderBoardKeys}
        activeLink={activeFps}
        setActiveLink={setActiveFps}
      />

      {getFpsNumber(activeFps) && (
        <JhLeaderBoardTable data={activeLeaderBoardData} keyName={activeFps} />
      )}

      {activeLeaderBoardData && (
        <p className={s.noPlayerFound}>
          There is no player with name <span>{searchParams.get("player")}</span>
        </p>
      )}
    </section>
  );
};
export default JhLeaderBoardSection;
