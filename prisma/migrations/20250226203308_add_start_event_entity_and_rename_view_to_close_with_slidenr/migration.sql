/*
  Warnings:

  - You are about to drop the `LogPresentationView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LogPresentationView" DROP CONSTRAINT "LogPresentationView_presentationId_fkey";

-- DropTable
DROP TABLE "LogPresentationView";

-- CreateTable
CREATE TABLE "LogPresentationClose" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slideNumber" INTEGER NOT NULL,
    "presentationUrl" TEXT NOT NULL,
    "finalProgress" DOUBLE PRECISION NOT NULL,
    "totalDwellTime" INTEGER NOT NULL,

    CONSTRAINT "LogPresentationClose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogPresentationStart" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,

    CONSTRAINT "LogPresentationStart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LogPresentationClose_presentationId_timestamp_idx" ON "LogPresentationClose"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogPresentationClose_presentationId_idx" ON "LogPresentationClose"("presentationId");

-- CreateIndex
CREATE INDEX "LogPresentationStart_presentationId_timestamp_idx" ON "LogPresentationStart"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogPresentationStart_presentationId_idx" ON "LogPresentationStart"("presentationId");

-- AddForeignKey
ALTER TABLE "LogPresentationClose" ADD CONSTRAINT "LogPresentationClose_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogPresentationStart" ADD CONSTRAINT "LogPresentationStart_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
