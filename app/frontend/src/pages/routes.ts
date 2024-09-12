export const basePath = "";

export const ROUTES = {
  index: `${basePath}/`,
  list: `${basePath}/list`,
  manage: `${basePath}/manage`,
  contribute: `${basePath}/add`,
  about: `${basePath}/about`,
  contact: `${basePath}/contact`
};

const authBasePath = "/auth";

export const AUTH_ROUTES = {
  login: `${authBasePath}?page=login`,
  register: `${authBasePath}?page=register`,
  resetPassword: `${authBasePath}?page=reset-password`
};
