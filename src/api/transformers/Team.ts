import { IPlayerResponse, PlayerTransformer } from "@/api/transformers/Player";

export interface ITeamResponse {
  name: string;
  points: number;
  place: number;
  total_kills: number;
  players: IPlayerResponse[];
}

export interface ITeam extends ITeamResponse {}

export class TeamTransformer {
  public static fromApiOnce(data: ITeamResponse): ITeam {
    return {
      ...data,
      players: PlayerTransformer.fromApiMany(data.players),
    };
  }
  public static fromApiMany(data: ITeamResponse[]): ITeam[] {
    return data.map((el) => TeamTransformer.fromApiOnce(el));
  }
}
