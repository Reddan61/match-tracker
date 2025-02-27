import { Card } from "@/Components/Cards/Card/Card";
import { useMatches } from "@/store/Matches";

import styles from "./Cards.module.scss";

export const Cards = () => {
  const matches = useMatches((state) => state.matches);

  return (
    <main className={styles.list}>
      {matches.map((match) => (
        <Card match={match} key={match.id} />
      ))}
    </main>
  );
};
