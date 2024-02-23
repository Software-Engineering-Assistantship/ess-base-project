-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Promotion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL
);
INSERT INTO "new_Promotion" ("category", "discount", "end_date", "id", "start_date") SELECT "category", "discount", "end_date", "id", "start_date" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
CREATE TABLE "new_Cupom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL
);
INSERT INTO "new_Cupom" ("discount", "end_date", "id", "name", "start_date") SELECT "discount", "end_date", "id", "name", "start_date" FROM "Cupom";
DROP TABLE "Cupom";
ALTER TABLE "new_Cupom" RENAME TO "Cupom";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
