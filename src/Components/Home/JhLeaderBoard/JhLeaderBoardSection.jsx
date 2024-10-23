import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import leaderBoardData from "src/Data/leaderboards.json";
import { getFpsNoun } from "src/Functions/helper";
import s from "./JhLeaderBoardSection.module.scss";
import JhLeaderBoardTable from "./JhLeaderBoardTable/JhLeaderBoardTable";
import LeaderBoardNav from "./LeaderBoardNav/LeaderBoardNav";

const JhLeaderBoardSection = () => {
  const [leaderBoard, setLeaderBoard] = useState(leaderBoardData);
  const leaderBoardKeys = Object.keys(leaderBoard);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFps, setActiveFps] = useState(searchParams.get("fps") || "125");

  useEffect(() => {
    const editedActiveFps = getFpsNoun(activeFps);
    setSearchParams({ fps: editedActiveFps.toLowerCase() });
  }, [activeFps]);

  return (
    <section className={s.leaderBoardSection}>
      <LeaderBoardNav
        navLinks={leaderBoardKeys}
        activeLink={activeFps}
        setActiveLink={setActiveFps}
      />

      {leaderBoard[activeFps] && (
        <JhLeaderBoardTable data={leaderBoard[activeFps]} keyName={activeFps} />
      )}
    </section>
  );
};
export default JhLeaderBoardSection;
