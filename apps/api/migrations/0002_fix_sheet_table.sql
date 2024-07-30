-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sheet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "code" TEXT NOT NULL,
    "code_expired_at" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Sheet" ("code", "code_expired_at", "createdAt", "id", "updatedAt") SELECT "code", "code_expired_at", "createdAt", "id", "updatedAt" FROM "Sheet";
DROP TABLE "Sheet";
ALTER TABLE "new_Sheet" RENAME TO "Sheet";
CREATE UNIQUE INDEX "Sheet_code_key" ON "Sheet"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
