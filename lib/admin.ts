import { auth } from "@clerk/nextjs/server";

const allowedIds = ["user_2x5I2bUOT0HGfn68BdTNZZwX80n"];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
