/*
  Warnings:

  - Added the required column `activity_type` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "activity_type" TEXT NOT NULL;
