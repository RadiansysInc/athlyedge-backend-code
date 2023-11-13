-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "ISBN" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
