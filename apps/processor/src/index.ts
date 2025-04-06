import kafka, { KAFKA_TOPIC_NAME } from "@flowlink/kafka";
import prisma from "@flowlink/db";

async function main() {
  // Creating a Kafka producer and connecting to the Kafka broker
  const producer = kafka.producer();
  await producer.connect();

  try {
    // Infinite loop to keep the process alive
    // while (1) {
    // Step 1: Pull from outbox table
    const zapRecords = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    console.log(zapRecords, "zapRecords");
    // Step 2: Produce to kafka queue
    await producer.send({
      topic: KAFKA_TOPIC_NAME,
      messages: zapRecords.map((record: any) => ({
        value: record.zapRunId,
        stage: 0,
      })),
    });

    // Step 3: Delete from outbox table
    // await prisma.zapRunOutbox.deleteMany({
    //   where: {
    //     id: {
    //       in: zapRecords.map((record) => record.id),
    //     },
    //   },
    // });
    // }
  } catch (error) {
    console.error("Error in producer loop:", error);
  }
}

// Invoke the main function
main();
