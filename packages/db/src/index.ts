import { PrismaClient } from "@prisma/client";

console.log("prisma cwd", process.cwd(), "seckk,", process.env.DATABASE_URL);

class PrismaSingleton {
  private static _instance: PrismaClient | null = null;

  private constructor() {}

  static get instance(): PrismaClient {
    if (!this._instance) {
      this._instance = new PrismaClient();
    }
    return this._instance;
  }

  static async disconnect(): Promise<void> {
    if (this._instance) {
      await this._instance.$disconnect();
      this._instance = null;
    }
  }
}

const prisma = PrismaSingleton.instance;
export default prisma;
