-- CreateTable
CREATE TABLE "CardPayment" (
    "card_number" TEXT NOT NULL,
    "card_id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expire_date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "CardPayment_number_fkey" FOREIGN KEY ("number") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CardPayment_number_key" ON "CardPayment"("number");

-- CreateIndex
CREATE UNIQUE INDEX "CardPayment_card_number_type_key" ON "CardPayment"("card_number", "type");
