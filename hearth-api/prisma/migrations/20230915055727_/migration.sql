/*
  Warnings:

  - You are about to drop the column `previous_tutorial_id` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[previous_course_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_previous_tutorial_id_fkey";

-- DropIndex
DROP INDEX "Course_previous_tutorial_id_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "previous_tutorial_id",
ADD COLUMN     "previous_course_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Course_previous_course_id_key" ON "Course"("previous_course_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_previous_course_id_fkey" FOREIGN KEY ("previous_course_id") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
