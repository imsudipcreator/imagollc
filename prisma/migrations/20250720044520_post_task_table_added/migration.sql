-- CreateEnum
CREATE TYPE "Status" AS ENUM ('generating', 'generated');

-- CreateTable
CREATE TABLE "PostTask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "PostTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostTask_id_key" ON "PostTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostTask_userId_key" ON "PostTask"("userId");
