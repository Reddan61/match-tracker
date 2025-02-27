import { createURL, IApiResponse } from "@/api/config";
import { IMatchResponse, MatchTransformer } from "@/api/transformers/Match";

enum MATCHES_ENDPOINTS {
  GET_ALL_MATCHES = "fronttemp",
}

interface IMatchesListResponse
  extends IApiResponse<{ matches: IMatchResponse[] }> {}

export class Matches_API {
  public static async getMatches() {
    try {
      const response = await fetch(
        createURL(MATCHES_ENDPOINTS.GET_ALL_MATCHES)
      );

      if (!response.ok) {
        throw new Error("Can't get matches");
      }

      const json: IMatchesListResponse = await response.json();
      const transformed = MatchTransformer.fromApiMany(json.data.matches);

      return transformed;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
