import LogoIcon from "svg/logo.svg";
import { Error } from "@/Components/Header/Error/Error";
import { Filter } from "@/Components/Header/Filter/Filter";
import { Refresh } from "@/Components/Header/Refresh/Refresh";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <LogoIcon className={styles.logo} />
        <Filter />
      </div>
      <div className={styles.right}>
        <Error />
        <Refresh />
      </div>
    </header>
  );
};
