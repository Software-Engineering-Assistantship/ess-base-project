/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the `restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_restaurantId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "restaurantId";

-- DropTable
DROP TABLE "restaurant";
