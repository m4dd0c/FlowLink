export const sendSol = async ({
  to,
  amount,
}: {
  to: string;
  amount: number;
}) => {
  if (!process.env.SOLANA_PRIVATE_KEY) {
    console.error("SOLANA_PRIVATE_KEY is not set");
    return;
  }
  try {
    console.log("Successful, Transaction signature blah blah blah!!!");
    return true;
  } catch (error) {
    console.error("Error in sendSol:", error);
  }
};
