import Redis from "ioredis";

class RedisSingleton {
  private static _instance: Redis | null = null;

  private constructor() {}

  static get instance(): Redis {
    if (!this._instance) {
      this._instance = new Redis();
      this._instance.on("error", (err) => {
        console.error("Redis connection error:", err);
      });
    }
    return this._instance;
  }

  static async close(): Promise<void> {
    if (this._instance) {
      await this._instance.quit();
      this._instance = null;
    }
  }
}

const redis = RedisSingleton.instance;
export default redis;
