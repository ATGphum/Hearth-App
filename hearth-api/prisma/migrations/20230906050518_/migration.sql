/*
  Warnings:

  - A unique constraint covering the columns `[auth0_username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0_username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth0_username" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0_username_key" ON "User"("auth0_username");
