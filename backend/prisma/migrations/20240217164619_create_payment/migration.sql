-- CreateTable
CREATE TABLE "CardPayment" (
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "CardPayment_number_fkey" FOREIGN KEY ("number") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CardPayment_number_type_key" ON "CardPayment"("number", "type");
