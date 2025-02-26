/*
  Warnings:

  - Added the required column `slideNumber` to the `LogLinkAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slideNumber` to the `LogMediaAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slideNumber` to the `LogQuizAction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slideNumber` to the `LogSlideView` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogLinkAction" ADD COLUMN     "slideNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LogMediaAction" ADD COLUMN     "slideNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LogQuizAction" ADD COLUMN     "slideNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LogSlideView" ADD COLUMN     "slideNumber" INTEGER NOT NULL;
