import {ENV} from "../lib/env.js";

const baseOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: ENV.NODE_ENV === "PRODUCTION",
};

const refreshTokenOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: ENV.NODE_ENV === "PRODUCTION",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export {baseOptions, refreshTokenOptions};
