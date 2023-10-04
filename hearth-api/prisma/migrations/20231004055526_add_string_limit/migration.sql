/*
  Warnings:

  - You are about to alter the column `stripe_subscription_frequency` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stripe_subscription_frequency" SET DATA TYPE VARCHAR(255);
