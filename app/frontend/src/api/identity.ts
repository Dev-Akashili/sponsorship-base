import { request } from "./request";

const fetchKeys = {
  login: "login?useCookies=true&useSessionCookies=true",
  logout: "logout",
};

export async function register(formData: { email: string; password: string }) {
  return await request("register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
    identity: true,
  });
}

export async function login(formData: { email: string; password: string }) {
  return await request(fetchKeys.login, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
    identity: true,
  });
}

export async function logout() {
  return await request(fetchKeys.logout, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
    identity: true,
  });
}
