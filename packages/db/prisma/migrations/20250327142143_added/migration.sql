-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTriggers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTriggers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableActions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "ZapRun_zapId_key" ON "ZapRun"("zapId");

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTriggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
