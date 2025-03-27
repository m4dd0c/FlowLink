import { PrismaClient } from "@prisma/client";

class PrismaSingleton {
  private client: PrismaClient;
  private static _instance: PrismaSingleton;

  private constructor() {
    this.client = new PrismaClient();
  }

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  getClient() {
    return this.client;
  }
}

const prisma = PrismaSingleton.instance.getClient();
export default prisma;
