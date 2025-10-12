/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OneTimeToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OneTimeToken_token_key" ON "public"."OneTimeToken"("token");
