import { User } from "@/types";
import { request } from "./request";

const fetchKeys = { getUser: "user" };

export async function getUser(): Promise<Response> {
  return await request<User>(fetchKeys.getUser);
}
