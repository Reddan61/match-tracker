import RefreshIcon from "svg/Refresh.svg";
import { Matches_API } from "@/api/Matches";
import { useMatches } from "@/store/Matches";

import styles from "./Refresh.module.scss";

export const Refresh = () => {
  const isLoading = useMatches((state) => state.isLoading);
  const setMatches = useMatches((state) => state.setMatches);
  const setError = useMatches((state) => state.setError);
  const setStartLoading = useMatches((state) => state.setStartLoading);

  const refresh = async () => {
    setStartLoading();

    const response = await Matches_API.getMatches();

    if (response) {
      setMatches(response);
    } else {
      setError(true);
    }
  };

  return (
    <button
      className={`${styles.button} ${isLoading ? styles.loading : ""}`}
      onClick={refresh}
      disabled={isLoading}
    >
      <span>Обновить</span>
      <RefreshIcon className={isLoading ? styles.icon : ""} />
    </button>
  );
};
