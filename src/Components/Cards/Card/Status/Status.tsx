import { FC } from "react";
import { MATCH_STATUS } from "@/api/transformers/Status";

import styles from "./Status.module.scss";

const STYLES_BY_STATUS: Record<MATCH_STATUS, string> = {
  [MATCH_STATUS.LIVE]: styles.live,
  [MATCH_STATUS.FINISHED]: styles.finished,
  [MATCH_STATUS.PREPARING]: styles.preparing,
};

const TEXT_BY_STATUS: Record<MATCH_STATUS, string> = {
  [MATCH_STATUS.LIVE]: "Live",
  [MATCH_STATUS.FINISHED]: "Finished",
  [MATCH_STATUS.PREPARING]: "Match preparing",
};

interface IProps {
  status: MATCH_STATUS;
}

export const Status: FC<IProps> = ({ status }) => {
  return (
    <div className={`${styles.status} ${STYLES_BY_STATUS[status]}`}>
      {TEXT_BY_STATUS[status]}
    </div>
  );
};
