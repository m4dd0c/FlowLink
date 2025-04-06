import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import path from "path";

// Setting .env.backend file as centralized .env file for all backend apps.
dotenv.config({ path: path.resolve(__dirname, "../../../.env.backend") });

class KafkaSingleton {
  private static _instance: Kafka;
  private constructor() {}

  // _instance creation and getter
  static get instance(): Kafka {
    if (!process.env.KAFKA_BROKERS) {
      throw new Error("KAFKA_BROKERS environment variable is not set");
    }

    if (!this._instance) {
      this._instance = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID || "my-app",
        brokers: [process.env.KAFKA_BROKERS],
      });
    }
    return this._instance;
  }
}

const instance = KafkaSingleton.instance;
export default instance;
