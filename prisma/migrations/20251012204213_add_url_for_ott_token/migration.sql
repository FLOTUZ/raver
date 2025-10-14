/*
  Warnings:

  - Added the required column `url` to the `OneTimeToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OneTimeToken" ADD COLUMN     "url" TEXT NOT NULL;
