/*
  Warnings:

  - You are about to drop the column `duration` on the `LogMediaAction` table. All the data in the column will be lost.
  - You are about to drop the column `quizname` on the `LogQuizAction` table. All the data in the column will be lost.
  - Added the required column `mediaType` to the `LogMediaAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDuration` to the `LogMediaAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalProgress` to the `LogPresentationView` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizName` to the `LogQuizAction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('AUDIO', 'VIDEO');

-- AlterTable
ALTER TABLE "LogMediaAction" DROP COLUMN "duration",
ADD COLUMN     "finished" BOOLEAN,
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "totalDuration" INTEGER NOT NULL,
ALTER COLUMN "progress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LogPresentationView" ADD COLUMN     "finalProgress" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "LogQuizAction" DROP COLUMN "quizname",
ADD COLUMN     "quizName" TEXT NOT NULL,
ALTER COLUMN "completed" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "dwellTime" DROP NOT NULL;
