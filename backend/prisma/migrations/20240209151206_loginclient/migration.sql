/*
  Warnings:

  - You are about to drop the column `number` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `number`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1;
