export const isProd = process.env.NODE_ENV === "production";

export const CONFIG = {
  CLIENT_ID: isProd
    ? process.env.GITHUB_CLIENT_ID_PROD
    : process.env.GITHUB_CLIENT_ID_LOCAL,

  CLIENT_SECRET: isProd
    ? process.env.GITHUB_CLIENT_SECRET_PROD
    : process.env.GITHUB_CLIENT_SECRET_LOCAL,

  REDIRECT_URI: isProd
    ? process.env.GITHUB_REDIRECT_URI_PROD
    : process.env.GITHUB_REDIRECT_URI_LOCAL,

  FRONTEND_URL: isProd
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_LOCAL,
};
