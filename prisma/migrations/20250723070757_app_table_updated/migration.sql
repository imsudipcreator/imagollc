/*
  Warnings:

  - The primary key for the `App` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[developerId]` on the table `App` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "App" DROP CONSTRAINT "App_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "App_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "App_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "App_id_key" ON "App"("id");

-- CreateIndex
CREATE UNIQUE INDEX "App_developerId_key" ON "App"("developerId");
