/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ConnectionTimeChoices" AS ENUM ('Morning', 'Midday', 'Evening');

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connection_time" "ConnectionTimeChoices",
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "email_reminders" BOOLEAN DEFAULT false,
ADD COLUMN     "first_name" VARCHAR(255),
ADD COLUMN     "instagram_username" VARCHAR(255),
ADD COLUMN     "last_name" VARCHAR(255),
ADD COLUMN     "partner_first_name" VARCHAR(255),
ADD COLUMN     "partner_last_name" VARCHAR(255);

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
