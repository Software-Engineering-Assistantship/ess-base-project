/*
  Warnings:

  - You are about to drop the column `cartId` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu" DROP CONSTRAINT "menu_cartId_fkey";

-- AlterTable
ALTER TABLE "menu" DROP COLUMN "cartId";

-- DropTable
DROP TABLE "cart";
