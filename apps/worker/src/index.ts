import kafka, { KAFKA_TOPIC_NAME } from "@flowlink/kafka";
import prisma from "@flowlink/db";
// import dotenv from 'dotenv';

async function main() {
  const consumer = kafka.consumer({ groupId: "flowlink-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: KAFKA_TOPIC_NAME, fromBeginning: true });

  try {
    await consumer.run({
      /* autoCommit: false, so kafka will not delete the message from queue implicitly */
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message?.value?.toString() /* zapRunId */,
        });
        // Step 1: Get zapRunId and find associated ZapRun
        if (message.value === null) {
          console.warn("Message value is null");
          return;
        }
        const zap = await prisma.zapRun.findUnique({
          where: { id: message?.value?.toString() },
          include: {},
        });

        if (!zap) {
          console.error("Zap not found");
          return;
        }
        // Step 2: Get Metadata (JSON) extract meaningful information. e.g., user_email, sol_amount
        const metadata = zap.metadata;
        console.log(metadata, "is metadata");
        // Step 3: Get All available actions. e.g., [send_mail, send_sol, send_mail]
        // Step 4A: Proceed them one by one by their respective order.
        // Step 4B: Send Email
        // Step 4C: Send Solana using tiplink or smth similar
        // Step 5: Commit the kafka message to delete it from the queue
        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      },
    });
  } catch (error) {
    console.error("Error in worker:", error);
  }
}

// Invoke the main function
main();
