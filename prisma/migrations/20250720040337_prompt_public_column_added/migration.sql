/*
  Warnings:

  - Added the required column `prompt` to the `CommunityPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommunityPost" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;
