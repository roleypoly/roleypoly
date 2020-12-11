import { Guild } from "roleypoly/common/types";
import { discordFetch } from "../utils/api-tools";

export const GetSlug = async (request: Request): Promise<Response> => {
  const reqURL = new URL(request.url)
  const serverID = reqURL.pathname.split('/')[2]
  
  const serverPayload = discordFetch<Guild>
};
