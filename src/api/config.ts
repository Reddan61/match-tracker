const config = {
  baseURL: "https://app.ftoyd.com/fronttemp-service",
  socketURL: "wss://app.ftoyd.com/fronttemp-service/ws",
};

export interface IApiResponse<D> {
  data: D;
  ok: boolean;
}

export const createURL = (url: string) => {
  return `${config.baseURL}/${url}`;
};

export const getConfigByKey = <K extends keyof typeof config>(
  key: K
): (typeof config)[K] => {
  return config[key];
};
