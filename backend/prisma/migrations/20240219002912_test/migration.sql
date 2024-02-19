-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardPayment" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "card_number" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "CardPayment_number_fkey" FOREIGN KEY ("number") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CardPayment" ("card_id", "card_number", "cvv", "expire_date", "name", "number", "password", "type") SELECT "card_id", "card_number", "cvv", "expire_date", "name", "number", "password", "type" FROM "CardPayment";
DROP TABLE "CardPayment";
ALTER TABLE "new_CardPayment" RENAME TO "CardPayment";
CREATE UNIQUE INDEX "CardPayment_card_number_type_key" ON "CardPayment"("card_number", "type");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
