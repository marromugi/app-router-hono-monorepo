-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tag_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentTag" (
    "paymentId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("paymentId", "tagId"),
    CONSTRAINT "PaymentTag_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PaymentTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentSplit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "percentage" REAL NOT NULL DEFAULT 0.0,
    "sheetUserId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    CONSTRAINT "PaymentSplit_sheetUserId_fkey" FOREIGN KEY ("sheetUserId") REFERENCES "SheetUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PaymentSplit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_sheetId_key" ON "Tag"("name", "sheetId");

-- CreateIndex
CREATE INDEX "PaymentSplit_paymentId_idx" ON "PaymentSplit"("paymentId");

-- CreateIndex
CREATE INDEX "PaymentSplit_sheetUserId_idx" ON "PaymentSplit"("sheetUserId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSplit_sheetUserId_paymentId_key" ON "PaymentSplit"("sheetUserId", "paymentId");
