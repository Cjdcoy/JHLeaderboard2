import s from "./Home.module.scss";
import JhLeaderBoard from "./JhLeaderBoard/JhLeaderBoard";

const Home = () => {
  return (
    <main className={s.home}>
      <JhLeaderBoard />
    </main>
  );
};
export default Home;
