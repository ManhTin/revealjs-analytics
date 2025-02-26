-- CreateEnum
CREATE TYPE "MediaActionType" AS ENUM ('PLAY', 'PAUSE');

-- CreateEnum
CREATE TYPE "QuizActionType" AS ENUM ('START', 'COMPLETE');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('INTERNAL', 'EXTERNAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogPresentationView" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,
    "totaldwellTime" INTEGER NOT NULL,

    CONSTRAINT "LogPresentationView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogMediaAction" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "mediaSource" TEXT NOT NULL,
    "actionType" "MediaActionType" NOT NULL,
    "currentTime" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LogMediaAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogQuizAction" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,
    "actionType" "QuizActionType" NOT NULL,
    "quizId" TEXT NOT NULL,
    "quizname" TEXT NOT NULL,
    "numberOfQuestions" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "dwellTime" INTEGER NOT NULL,

    CONSTRAINT "LogQuizAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogLinkAction" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,
    "linkType" "LinkType" NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "linkText" TEXT NOT NULL,

    CONSTRAINT "LogLinkAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogSlideView" (
    "id" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "presentationUrl" TEXT NOT NULL,
    "dwellTime" INTEGER NOT NULL,

    CONSTRAINT "LogSlideView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_url_key" ON "Presentation"("url");

-- CreateIndex
CREATE INDEX "Presentation_title_idx" ON "Presentation"("title");

-- CreateIndex
CREATE INDEX "LogPresentationView_presentationId_timestamp_idx" ON "LogPresentationView"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogPresentationView_presentationId_idx" ON "LogPresentationView"("presentationId");

-- CreateIndex
CREATE INDEX "LogMediaAction_presentationId_timestamp_idx" ON "LogMediaAction"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogMediaAction_presentationId_idx" ON "LogMediaAction"("presentationId");

-- CreateIndex
CREATE INDEX "LogMediaAction_mediaId_idx" ON "LogMediaAction"("mediaId");

-- CreateIndex
CREATE INDEX "LogQuizAction_presentationId_timestamp_idx" ON "LogQuizAction"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogQuizAction_presentationId_idx" ON "LogQuizAction"("presentationId");

-- CreateIndex
CREATE INDEX "LogQuizAction_quizId_idx" ON "LogQuizAction"("quizId");

-- CreateIndex
CREATE INDEX "LogLinkAction_presentationId_timestamp_idx" ON "LogLinkAction"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogLinkAction_presentationId_idx" ON "LogLinkAction"("presentationId");

-- CreateIndex
CREATE INDEX "LogSlideView_presentationId_timestamp_idx" ON "LogSlideView"("presentationId", "timestamp");

-- CreateIndex
CREATE INDEX "LogSlideView_presentationId_idx" ON "LogSlideView"("presentationId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogPresentationView" ADD CONSTRAINT "LogPresentationView_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogMediaAction" ADD CONSTRAINT "LogMediaAction_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogQuizAction" ADD CONSTRAINT "LogQuizAction_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogLinkAction" ADD CONSTRAINT "LogLinkAction_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogSlideView" ADD CONSTRAINT "LogSlideView_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
