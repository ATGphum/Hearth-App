-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "quote_text" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "todays_quote" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
