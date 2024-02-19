-- CreateTable
CREATE TABLE "Receipt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" REAL NOT NULL
);
