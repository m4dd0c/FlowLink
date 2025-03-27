export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

export const userDTO = (user: any) => {
  const { password, ...safeUser } = user;
  return safeUser;
};
