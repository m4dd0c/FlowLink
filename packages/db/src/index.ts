import { PrismaClient } from "@prisma/client";

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
