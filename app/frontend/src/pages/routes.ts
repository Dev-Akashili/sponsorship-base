const basePath = "";

export const ROUTES = {
  index: `${basePath}/`,
};

const authBasePath = "/auth";

export const AUTH_ROUTES = {
  login: `${authBasePath}?page=login`,
  register: `${authBasePath}?page=register`,
};
