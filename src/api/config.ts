const config = {
  baseURL: "https://app.ftoyd.com/fronttemp-service",
};

export interface IApiResponse<D> {
  data: D;
  ok: boolean;
}

export const createURL = (url: string) => {
  return `${config.baseURL}/${url}`;
};
