import { useEffect } from "react";
import { useMatches } from "@/store/Matches";
import { Matches_API } from "@/api/Matches";
import { IMatchResponse, MatchTransformer } from "@/api/transformers/Match";
import { Sockets, SOCKETS_ENDPOINTS } from "@/api/Sockets";
import { Cards } from "@/Components/Cards/Cards";
import { Header } from "@/Components/Header/Header";

import styles from "./App.module.scss";

export const App = () => {
  const setMatches = useMatches((state) => state.setMatches);
  const setError = useMatches((state) => state.setError);
  const setStartLoading = useMatches((state) => state.setStartLoading);
  const setEndLoading = useMatches((state) => state.setEndLoading);

  useEffect(() => {
    (async function () {
      setStartLoading();

      const result = await Matches_API.getMatches();

      if (result) {
        setMatches(result);
      } else {
        setError(true);
      }

      setEndLoading();

      Sockets.connect();
      Sockets.on<IMatchResponse[]>(SOCKETS_ENDPOINTS.UPDATE_MATCHES, (data) => {
        const transformed = MatchTransformer.fromApiMany(data);
        setMatches(transformed);
      });
    })();
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Cards />
    </div>
  );
};
