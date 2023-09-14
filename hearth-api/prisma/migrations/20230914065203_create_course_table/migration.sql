-- CreateEnum
CREATE TYPE "CourseCategoryChoices" AS ENUM ('journey');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription_status" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "level" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "previous_tutorial_id" INTEGER,
    "subscription_required" BOOLEAN NOT NULL DEFAULT true,
    "category" "CourseCategoryChoices",

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_previous_tutorial_id_key" ON "Course"("previous_tutorial_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_previous_tutorial_id_fkey" FOREIGN KEY ("previous_tutorial_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
