import { Config } from "@roleypoly/api/src/config";
import { AuthTokenResponse } from "@roleypoly/types";

export const createSession = async (
  config: Config,
  sessionId: string,
  tokens: AuthTokenResponse
)