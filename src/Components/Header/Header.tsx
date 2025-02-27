import LogoIcon from "svg/logo.svg";
import { Error } from "@/Components/Header/Error/Error";
import { Refresh } from "@/Components/Header/Refresh/Refresh";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <LogoIcon />
      <div className={styles.right}>
        <Error />
        <Refresh />
      </div>
    </header>
  );
};
