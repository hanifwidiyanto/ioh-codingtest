import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()
const secret = process.env.JWT_SECRET

export const authService = () => {
  if (!secret) {
    throw new Error("JWT_TOKEN_SECRET is not set");
  }

  const issue = (payload) =>
    jwt.sign(payload, secret, {
      expiresIn: "1d",
    });

  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};