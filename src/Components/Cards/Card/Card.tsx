import { FC } from "react";
import TeamIcon from "svg/team.svg";
import { IMatch } from "@/api/transformers/Match";
import { Status } from "@/Components/Cards/Card/Status/Status";

import styles from "./Card.modules.scss";

interface IProps {
  match: IMatch;
}

export const Card: FC<IProps> = ({ match }) => {
  const { homeTeam, awayTeam, awayScore, homeScore } = match;

  return (
    <article className={styles.card}>
      <div className={styles.team}>
        <TeamIcon />
        <h2>{homeTeam.name}</h2>
      </div>
      <div className={styles.score}>
        <p>
          {homeScore} : {awayScore}
        </p>
        <Status status={match.status} />
      </div>
      <div className={styles.team}>
        <h2>{awayTeam.name}</h2>
        <TeamIcon />
      </div>
    </article>
  );
};
