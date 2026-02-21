import dotenv from "dotenv";

dotenv.config({quiet: true});

const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export {ENV};
