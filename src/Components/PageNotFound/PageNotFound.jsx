import { useEffect } from "react";
import img404 from "../../Assets/404.webp";
import s from "./PageNotFound.module.scss";

const PageNotFound = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <main className={s.pageNotFound}>
      <img src={img404} alt="Page not found image" />
      <h1>This page doesn’t exist</h1>
      <p>Please check your URL or return to the home page.</p>
      <button type="button">Return to Home page</button>
    </main>
  );
};
export default PageNotFound;
