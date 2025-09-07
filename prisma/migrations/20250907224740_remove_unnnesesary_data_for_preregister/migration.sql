/*
  Warnings:

  - You are about to drop the column `is_paid` on the `PreRegister` table. All the data in the column will be lost.
  - You are about to drop the column `payment_reference` on the `PreRegister` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `PreRegister` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `PreRegister` table. All the data in the column will be lost.
  - Added the required column `telephone` to the `PreRegister` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PreRegister" DROP COLUMN "is_paid",
DROP COLUMN "payment_reference",
DROP COLUMN "phone",
DROP COLUMN "price",
ADD COLUMN     "telephone" TEXT NOT NULL;
