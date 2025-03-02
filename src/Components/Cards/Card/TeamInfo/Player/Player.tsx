import { FC } from "react";
import PlayerAvatar from "png/avatar_global.png";
import { IPlayer } from "@/api/transformers/Player";

import styles from "./PLayer.module.scss";

interface IProps {
  player: IPlayer;
}

export const Player: FC<IProps> = ({ player: { kills, username } }) => {
  return (
    <div className={styles.player}>
      <div className={styles.block}>
        <img src={PlayerAvatar} alt={`${username} avatar`} />
        <h3>{username}</h3>
      </div>
      <div className={styles.block}>
        <p className={styles.kills}>
          Убийств: <span>{kills}</span>
        </p>
      </div>
    </div>
  );
};
