/*
  Warnings:

  - You are about to drop the column `developerId` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `developerId` on the `Website` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "App" DROP CONSTRAINT "App_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_developerId_fkey";

-- DropIndex
DROP INDEX "App_developerId_key";

-- AlterTable
ALTER TABLE "App" DROP COLUMN "developerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "developerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "App_userId_key" ON "App"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Website_userId_key" ON "Website"("userId");

-- AddForeignKey
ALTER TABLE "App" ADD CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
