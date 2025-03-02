import { FC, useState } from "react";
import TeamIcon from "svg/team.svg";
import { IMatch } from "@/api/transformers/Match";
import { TeamInfo } from "@/Components/Cards/Card/TeamInfo/TeamInfo";
import { OpenArrow } from "@/Components/Cards/Card/OpenArrow/OpenArrow";
import { TeamsScore } from "@/Components/Cards/Card/TeamsScore/TeamsScore";

import styles from "./Card.modules.scss";

interface IProps {
  match: IMatch;
}

export const Card: FC<IProps> = ({ match }) => {
  const { homeTeam, awayTeam } = match;
  const [isOpen, setOpen] = useState(false);

  const onOpenClick = () => {
    setOpen(!isOpen);
  };

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.topContainer}>
          <div className={styles.team}>
            <TeamIcon className={styles.icon} />
            <h2>{homeTeam.name}</h2>
          </div>
          <TeamsScore match={match} />
          <div className={styles.team}>
            <h2>{awayTeam.name}</h2>
            <TeamIcon className={styles.icon} />
          </div>
        </div>
        <OpenArrow
          isOpen={isOpen}
          onOpen={onOpenClick}
          classNames={styles.openInfoTop}
        />
      </div>
      <div
        className={`
          ${styles.teamsInfo} 
          ${isOpen ? styles.teamInfoShow : ""}
        `}
      >
        <TeamInfo team={homeTeam} />
        <div className={styles.separator}>
          <div></div>
          <span>VS</span>
          <div></div>
        </div>
        <TeamInfo team={awayTeam} />
      </div>
      <OpenArrow
        isOpen={isOpen}
        onOpen={onOpenClick}
        classNames={styles.openInfoBottom}
      />
    </article>
  );
};
