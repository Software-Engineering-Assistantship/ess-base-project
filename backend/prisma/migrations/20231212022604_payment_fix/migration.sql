/*
  Warnings:

  - Changed the type of `cardNumber` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cvv` on the `payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "cardNumber",
ADD COLUMN     "cardNumber" INTEGER NOT NULL,
DROP COLUMN "cvv",
ADD COLUMN     "cvv" INTEGER NOT NULL;
