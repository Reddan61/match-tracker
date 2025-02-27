import AlertIcon from "svg/alert.svg";
import { useMatches } from "@/store/Matches";

import styles from "./Error.module.scss";

export const Error = () => {
  const isError = useMatches((state) => state.isError);

  if (!isError) return null;

  return (
    <div role="alert" className={styles.error}>
      <AlertIcon />
      <p>Ошибка: не удалось загрузить информацию</p>
    </div>
  );
};
