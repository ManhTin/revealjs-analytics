/*
  Warnings:

  - Added the required column `slideNumber` to the `LogPresentationStart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogPresentationStart" ADD COLUMN     "slideNumber" INTEGER NOT NULL;
