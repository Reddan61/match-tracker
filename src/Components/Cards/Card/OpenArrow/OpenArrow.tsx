import { FC } from "react";
import OpenArrowIcon from "svg/arrow-down.svg";

import styles from "./OpenArrow.module.scss";

interface IProps {
  isOpen: boolean;
  onOpen: () => void;
  classNames?: string;
}

export const OpenArrow: FC<IProps> = ({ isOpen, onOpen, classNames = "" }) => {
  return (
    <div className={classNames}>
      <button className={styles.openInfo} onClick={onOpen}>
        <OpenArrowIcon
          className={`${styles.arrowIcon} ${
            isOpen ? styles.arrowIconOpen : ""
          }`}
        />
      </button>
    </div>
  );
};
