/*
  Warnings:

  - You are about to drop the column `totaldwellTime` on the `LogPresentationView` table. All the data in the column will be lost.
  - Added the required column `totalDwellTime` to the `LogPresentationView` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogPresentationView" DROP COLUMN "totaldwellTime",
ADD COLUMN     "totalDwellTime" INTEGER NOT NULL;
