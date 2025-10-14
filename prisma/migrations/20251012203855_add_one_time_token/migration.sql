-- CreateTable
CREATE TABLE "public"."OneTimeToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OneTimeToken_pkey" PRIMARY KEY ("id")
);
