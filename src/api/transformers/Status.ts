export enum MATCH_STATUS_RESPONSE {
  FINISHED = "Finished",
  LIVE = "Ongoing",
  PREPARING = "Scheduled",
}

export enum MATCH_STATUS {
  FINISHED = "Finished",
  LIVE = "Ongoing",
  PREPARING = "Scheduled",
}

export class StatusTransfromer {
  private static TRANSFORMER_TYPES: Record<
    MATCH_STATUS_RESPONSE,
    MATCH_STATUS
  > = {
    [MATCH_STATUS_RESPONSE.LIVE]: MATCH_STATUS.LIVE,
    [MATCH_STATUS_RESPONSE.PREPARING]: MATCH_STATUS.PREPARING,
    [MATCH_STATUS_RESPONSE.FINISHED]: MATCH_STATUS.FINISHED,
  };

  public static fromApiOnce(data: MATCH_STATUS_RESPONSE): MATCH_STATUS {
    return StatusTransfromer.TRANSFORMER_TYPES[data];
  }
}
