-- AlterTable
ALTER TABLE "public"."Ticket" ADD COLUMN     "checker_id" TEXT,
ADD COLUMN     "cheked_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Checker" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Checker" ADD CONSTRAINT "Checker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_checker_id_fkey" FOREIGN KEY ("checker_id") REFERENCES "public"."Checker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
