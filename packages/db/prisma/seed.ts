import prisma from "../src";

const seedData = {
  Auth: {
    id: "cm9md8n4n0000v7xockfw0nc3",
    name: "John Doe",
    email: "john@doe.com",
    password: "password",
  },
  User: {
    id: "cm9md9atr0001v7xo5pzwv0o9",
    authId: "cm9md8n4n0000v7xockfw0nc3",
    createdAt: "2025-04-18T05:46:15.951Z",
    updatedAt: "2025-04-18T05:46:15.951Z",
  },
  AvailableTriggers: [
    {
      id: "cm9md9lwz0002v7xodhz538ch",
      name: "Webhook",
    },
  ],
  AvailableActions: [
    {
      id: "cm9md9uqg0003v7xoapgpgon1",
      name: "Solana",
    },
    {
      id: "cm9mda0jv0004v7xo8c5cs0lp",
      name: "Gmail",
    },
  ],
  actions: [
    {
      id: "cm9mdcs4s0006v7xoh2q7u2of",
      title: "Send Solana",
      metadata: `{
                  "to": "Nitesh Suthar",
                  "from": "Manish Suthar",
                  "amount": "0.5 sol",
                }`,
      availableActionId: "cm9md9uqg0003v7xoapgpgon1",
      sortingOrder: 0,
      zapId: "cm9mdbivm0005v7xosj05lrfa",
    },
    {
      id: "cm9mddqcv0007v7xobti297gu",
      title: "Send Gmail",
      metadata: `{
                  "to": "nitesh@suthar.com",
                  "from": "manish@suthar.com",
                  "body": "Hey brother, How are you doing.",
                }`,
      availableActionId: "cm9mda0jv0004v7xo8c5cs0lp",
      sortingOrder: 1,
      zapId: "cm9mdbivm0005v7xosj05lrfa",
    },
  ],
  trigger: [
    {
      id: "cm9mdewgm0008v7xo7oye9p1h",
      title: "Github Comment",
      metadata: `{
                  "from": "manish@suthar.com",
                  "to": "nitesh@suthar.com",
                  "comment": "/bounty 0.5 sol",
                 }`,
      availableTriggerId: "cm9md9lwz0002v7xodhz538ch",
      zapId: "cm9mdbivm0005v7xosj05lrfa",
    },
  ],
  zap: [
    {
      id: "cm9mdbivm0005v7xosj05lrfa",
      triggerId: "cm9mdewgm0008v7xo7oye9p1h",
      userId: "cm9md9atr0001v7xo5pzwv0o9",
    },
  ],
  zapRun: [],
  zapRunOutBox: [],
};

const main = async () => {
  await prisma.$transaction([
    prisma.auth.create({
      data: seedData.Auth,
    }),
    prisma.user.create({
      data: seedData.User,
    }),
  ]);

  console.log("\nUser & Auth records seeded!");

  await prisma.availableActions.createMany({
    data: seedData.AvailableActions,
  });

  await prisma.availableTriggers.createMany({
    data: seedData.AvailableTriggers,
  });

  console.log("\nAvailableTriggers & AvailableActions records seeded!");

  await prisma.$transaction(async (tx) => {
    await prisma.zap.createMany({
      data: seedData.zap,
    });

    console.log("\nZap records seeded!");

    await prisma.action.createMany({
      data: seedData.actions,
    });

    await prisma.trigger.createMany({
      data: seedData.trigger,
    });

    console.log("\nTriggers & Actions records seeded!");
  });
};

main();
