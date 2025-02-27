import {
  MATCH_STATUS,
  MATCH_STATUS_RESPONSE,
  StatusTransfromer,
} from "@/api/transformers/Status";
import { ITeam, ITeamResponse, TeamTransformer } from "@/api/transformers/Team";

export interface IMatchResponse {
  time: string;
  title: string;
  status: MATCH_STATUS_RESPONSE;
  awayTeam: ITeamResponse;
  homeTeam: ITeamResponse;
  homeScore: number;
  awayScore: number;
}

export interface IMatch {
  id: string;
  time: string;
  title: string;
  homeScore: number;
  awayScore: number;
  awayTeam: ITeam;
  homeTeam: ITeam;
  status: MATCH_STATUS;
}

export class MatchTransformer {
  public static fromApiOnce(data: IMatchResponse): IMatch {
    const homeTeam = TeamTransformer.fromApiOnce(data.homeTeam);
    const awayTeam = TeamTransformer.fromApiOnce(data.awayTeam);

    return {
      ...data,
      id: homeTeam.name + awayTeam.name + data.title,
      status: StatusTransfromer.fromApiOnce(data.status),
      awayTeam,
      homeTeam,
    };
  }
  public static fromApiMany(data: IMatchResponse[]): IMatch[] {
    return data.map((el) => MatchTransformer.fromApiOnce(el));
  }
}
