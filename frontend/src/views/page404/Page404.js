import React from "react";
import HomeButton from "components/homeButton/HomeButton";
import styles from "./Page404.module.css";

const Page404 = () => {
  return (
    <div className={styles.pageNotFound}>
      <HomeButton />
      Page not found!
    </div>
  );
};

export default Page404;
