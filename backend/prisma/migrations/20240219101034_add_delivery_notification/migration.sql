-- CreateTable
CREATE TABLE "Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    CONSTRAINT "Notification_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "deliveryPersonId" TEXT,
    CONSTRAINT "Delivery_deliveryPersonId_fkey" FOREIGN KEY ("deliveryPersonId") REFERENCES "DeliveryPerson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("id", "status") SELECT "id", "status" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
