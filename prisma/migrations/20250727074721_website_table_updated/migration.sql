/*
  Warnings:

  - The primary key for the `Website` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Website` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" DROP CONSTRAINT "Website_pkey",
DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "featuredImage" DROP NOT NULL,
ADD CONSTRAINT "Website_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Website_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Website_id_key" ON "Website"("id");
