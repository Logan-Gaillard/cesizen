-- CreateTable
CREATE TABLE "RateLimitAttempt" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "last_attempt_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimitAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_ratelimit_action" ON "RateLimitAttempt"("action");

-- CreateIndex
CREATE INDEX "idx_ratelimit_last_attempt" ON "RateLimitAttempt"("last_attempt_at");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimitAttempt_identifier_action_key" ON "RateLimitAttempt"("identifier", "action");
