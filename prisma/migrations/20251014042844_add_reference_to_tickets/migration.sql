/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reference` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Ticket" ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_reference_key" ON "public"."Ticket"("reference");
