import kafka, { KAFKA_TOPIC_NAME } from "@flowlink/kafka";
import prisma from "@flowlink/db";

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

        await new Promise((r) => setTimeout(r, 500));
        // Step 1: Get zapRunId and find associated ZapRun
        if (message.value !== null) {
          const zap = await prisma.zapRun.findUnique({
            where: { id: message?.value?.toString() },
            include: {
              zap: {
                include: {
                  actions: {
                    include: { type: true },
                  },
                },
              },
            },
          });

          if (zap) {
            console.log("zap", zap);
            // Step 2: Get Metadata (JSON) extract meaningful information. e.g., user_email, sol_amount
            const metadata = zap.metadata;
            console.log(metadata, "is metadata");
            // Step 3: Get All available actions. e.g., [send_mail, send_sol, send_mail]
            const actions = zap.zap.actions.map((record) => record.type.name);
            // Step 4A: Proceed them one by one by their respective order.

            console.log("actions are", actions);
            actions.forEach(async (action) => {
              console.log("action is", action);
              switch (action) {
                case "SEND_MAIL":
                  // Step 4A: Send Email
                  console.log("Sending email");
                  break;
                case "SEND_SOL":
                  // Step 4A: Send Solana using tiplink or smth similar
                  console.log("Sending solana");
                  break;
                default:
                  console.error("Unknown action type:", action);
              }
            });
          } else {
            console.error("Zap not found");
          }
        } else {
          console.warn("Message value is null");
        }
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
    console.log("program finish");
  } catch (error) {
    console.error("Error in worker:", error);
  }
}

// Invoke the main function
main();
