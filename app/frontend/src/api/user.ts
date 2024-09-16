import { User } from "@/types";
import { request } from "./request";

const fetchKeys = { getUser: "user", delete: "user" };

export async function getUser(): Promise<Response> {
  return await request<User>(fetchKeys.getUser);
}

export async function deleteUser() {
  return await request(fetchKeys.delete, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  });
}
