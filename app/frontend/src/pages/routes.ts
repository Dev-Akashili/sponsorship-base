const basePath = "";

export const ROUTES = {
  index: `${basePath}/`,
  sponsorshipList: `${basePath}/sponsorship-list`,
  contribute: `${basePath}/sponsorship-list/add`,
  about: `${basePath}/about`,
  contact: `${basePath}/contact`
};

const authBasePath = "/auth";

export const AUTH_ROUTES = {
  login: `${authBasePath}?page=login`,
  register: `${authBasePath}?page=register`,
  resetPassword: `${authBasePath}?page=reset-password`
};
