export interface IPlayerResponse {
  username: string;
  kills: number;
}

export interface IPlayer extends IPlayerResponse {}

export class PlayerTransformer {
  public static fromApiOnce(data: IPlayerResponse): IPlayer {
    return data;
  }
  public static fromApiMany(data: IPlayerResponse[]): IPlayer[] {
    return data.map((el) => PlayerTransformer.fromApiOnce(el));
  }
}
