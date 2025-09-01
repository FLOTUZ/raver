/*
  Warnings:

  - You are about to drop the column `buyer_email` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_name` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `buyer_phone` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `is_paid` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `mail_sent` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `payment_reference` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pre_register_id]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "buyer_email",
DROP COLUMN "buyer_name",
DROP COLUMN "buyer_phone",
DROP COLUMN "is_paid",
DROP COLUMN "mail_sent",
DROP COLUMN "payment_reference",
DROP COLUMN "price",
ADD COLUMN     "is_sended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pre_register_id" TEXT;

-- CreateTable
CREATE TABLE "public"."PreRegister" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "payment_reference" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_sended" BOOLEAN NOT NULL DEFAULT false,
    "event_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreRegister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_pre_register_id_key" ON "public"."Ticket"("pre_register_id");

-- AddForeignKey
ALTER TABLE "public"."PreRegister" ADD CONSTRAINT "PreRegister_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_pre_register_id_fkey" FOREIGN KEY ("pre_register_id") REFERENCES "public"."PreRegister"("id") ON DELETE SET NULL ON UPDATE CASCADE;
