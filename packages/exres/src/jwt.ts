import { isDev } from "@flowlink/utils";
import jwt, { JwtPayload } from "jsonwebtoken";

export const saveSession = (
  res: Response & {
    cookie: (...args: any) => any;
  } /* Jugaad or Install Express */,
  id: string,
) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found in .env file");

  const token = jwt.sign({ id }, secret, { expiresIn: "30d" });

  const cookieOptions = {
    httpOnly: true,
    secure: isDev() ? false : true,
    sameSite: isDev() ? "lax" : "none",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  res.cookie("token", token, cookieOptions);
};

export const verifySession = (token: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not found in .env file");
  const auth = jwt.verify(token, secret) as JwtPayload & { id: string };
  if (auth && auth?.id) return auth.id;
  else return null;
};
