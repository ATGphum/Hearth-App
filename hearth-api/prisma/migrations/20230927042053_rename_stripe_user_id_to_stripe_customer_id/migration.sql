/*
  Warnings:

  - You are about to drop the column `stripe_user_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripe_user_id",
ADD COLUMN     "stripe_customer_id" VARCHAR(255);
