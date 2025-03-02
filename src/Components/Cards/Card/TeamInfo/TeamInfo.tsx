import { FC } from "react";
import { ITeam } from "@/api/transformers/Team";
import { Player } from "@/Components/Cards/Card/TeamInfo/Player/Player";

import styles from "./TeamInfo.module.scss";

interface IProps {
  team: ITeam;
}

export const TeamInfo: FC<IProps> = ({ team }) => {
  return (
    <div className={styles.info}>
      <div className={styles.players}>
        {team.players.map((player) => (
          <Player player={player} key={player.username} />
        ))}
      </div>
      <div className={styles.stats}>
        <p>
          Points:
          <span>+{team.points}</span>
        </p>
        <div className={styles.separator}></div>
        <p>
          Место:
          <span>{team.place}</span>
        </p>
        <div className={styles.separator}></div>
        <p>
          Всего убийств:
          <span>{team.total_kills}</span>
        </p>
      </div>
    </div>
  );
};
