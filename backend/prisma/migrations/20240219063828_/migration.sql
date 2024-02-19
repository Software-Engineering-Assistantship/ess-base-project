-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cupom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL
);
INSERT INTO "new_Cupom" ("discount", "end_date", "id", "name", "start_date") SELECT "discount", "end_date", "id", "name", "start_date" FROM "Cupom";
DROP TABLE "Cupom";
ALTER TABLE "new_Cupom" RENAME TO "Cupom";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
