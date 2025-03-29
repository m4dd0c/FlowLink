import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import redis from "@flowlink/redis";

dotenv.config();

export const saveSession = async (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found in .env file");

  const token = jwt.sign({ id }, secret, { expiresIn: "30d" });
  try {
    await redis.set(`session:${id}`, token, "EX", 30 * 24 * 60 * 60);
  } catch (error) {
    console.error("Error saving session to redis:", error);
  }
  return token;
};

export const verifySession = async (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found in .env file");
  const auth = jwt.verify(token, secret) as JwtPayload & { id: string };

  if (auth && auth?.id) {
    await redis.get(`session:${auth.id}`);
  }
  return auth?.id;
};
