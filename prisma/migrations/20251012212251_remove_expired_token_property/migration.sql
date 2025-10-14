/*
  Warnings:

  - You are about to drop the column `expired` on the `OneTimeToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."OneTimeToken" DROP COLUMN "expired";
