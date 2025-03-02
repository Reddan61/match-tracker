import { FC, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { IMatch } from "@/api/transformers/Match";
import { Status } from "@/Components/Cards/Card/Status/Status";

import styles from "./TeamsScore.module.scss";

interface IProps {
  match: IMatch;
}

const AnimatedNumber: FC<{ num: number }> = ({ num }) => {
  const numRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={num}
        nodeRef={numRef}
        timeout={200}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
      >
        <span ref={numRef}>{num}</span>
      </CSSTransition>
    </SwitchTransition>
  );
};

export const TeamsScore: FC<IProps> = ({
  match: { awayScore, homeScore, status },
}) => {
  return (
    <div className={styles.score}>
      <p>
        <AnimatedNumber num={homeScore} />
        {" : "}
        <AnimatedNumber num={awayScore} />
      </p>
      <Status status={status} />
    </div>
  );
};
