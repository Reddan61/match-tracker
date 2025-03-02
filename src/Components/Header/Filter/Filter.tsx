import { useState } from "react";
import ArrowDownIcon from "svg/arrowdown2.svg";
import { MATCH_STATUS } from "@/api/transformers/Status";
import { FILTER_ALL, TFilter, useMatches } from "@/store/Matches";

import styles from "./Filter.module.scss";

const FILTER_TEXT: Record<TFilter, string> = {
  [FILTER_ALL]: "Все статусы",
  [MATCH_STATUS.LIVE]: "Live",
  [MATCH_STATUS.FINISHED]: "Finished",
  [MATCH_STATUS.PREPARING]: "Match preparing",
};

const FILTER_ORDER: TFilter[] = [
  FILTER_ALL,
  MATCH_STATUS.LIVE,
  MATCH_STATUS.FINISHED,
  MATCH_STATUS.PREPARING,
];

export const Filter = () => {
  const [isOpen, setOpen] = useState(false);
  const selectedFilter = useMatches((state) => state.filter);
  const setFilter = useMatches((state) => state.setFilter);

  const onOpenClick = () => {
    setOpen(!isOpen);
  };

  const onSelectClick = (filter: TFilter) => () => {
    onOpenClick();
    setFilter(filter);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.background} onClick={onOpenClick}></div>
      )}
      <div className={styles.filter}>
        <button className={styles.open} onClick={onOpenClick}>
          <p>{FILTER_TEXT[selectedFilter]}</p>
          <ArrowDownIcon
            className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
          />
        </button>
        {isOpen && (
          <div className={styles.statuses}>
            {FILTER_ORDER.map((filter) => {
              return (
                <button
                  key={filter}
                  className={styles.filterItem}
                  onClick={onSelectClick(filter)}
                >
                  {FILTER_TEXT[filter]}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
