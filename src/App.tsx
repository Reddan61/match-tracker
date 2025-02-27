import { useEffect } from "react";
import { Matches_API } from "@/api/Matches";
import { useMatches } from "@/store/Matches";
import { Cards } from "@/Components/Cards/Cards";
import { Header } from "@/Components/Header/Header";

import styles from "./App.module.scss";

export const App = () => {
  const setMatches = useMatches((state) => state.setMatches);
  const setError = useMatches((state) => state.setError);
  const setStartLoading = useMatches((state) => state.setStartLoading);

  useEffect(() => {
    (async function () {
      setStartLoading();

      const result = await Matches_API.getMatches();

      if (result) {
        setMatches(result);
      } else {
        setError(true);
      }
    })();
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Cards />
    </div>
  );
};
