-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "duration" VARCHAR(255) NOT NULL,
    "audio_link" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "previous_experience_id" INTEGER,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Experience_previous_experience_id_key" ON "Experience"("previous_experience_id");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_previous_experience_id_fkey" FOREIGN KEY ("previous_experience_id") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
