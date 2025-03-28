import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const saveSession = (id: string) => {
  const secret = process.env.JWT_SECRET;
  console.log("secret", secret);
  if (!secret) throw new Error("JWT_SECRET not found in .env file");

  const token = jwt.sign({ id }, secret, { expiresIn: "30d" });
  return token;
};

export const verifySession = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found in .env file");
  const auth = jwt.verify(token, secret) as JwtPayload & { id: string };
  if (auth && auth?.id) return auth.id;
  else return null;
};
