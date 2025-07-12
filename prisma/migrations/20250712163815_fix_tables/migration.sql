/*
  Warnings:

  - You are about to drop the column `developerSlug` on the `Apps` table. All the data in the column will be lost.
  - You are about to drop the column `developerSlug` on the `Websites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `developerId` to the `Apps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developerId` to the `Websites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Apps" DROP CONSTRAINT "Apps_developerSlug_fkey";

-- DropForeignKey
ALTER TABLE "Websites" DROP CONSTRAINT "Websites_developerSlug_fkey";

-- AlterTable
ALTER TABLE "Apps" DROP COLUMN "developerSlug",
ADD COLUMN     "developerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Websites" DROP COLUMN "developerSlug",
ADD COLUMN     "developerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- AddForeignKey
ALTER TABLE "Apps" ADD CONSTRAINT "Apps_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Websites" ADD CONSTRAINT "Websites_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
