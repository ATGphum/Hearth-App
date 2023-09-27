-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripe_subscription_id" VARCHAR(255),
ADD COLUMN     "stripe_user_id" VARCHAR(255);
