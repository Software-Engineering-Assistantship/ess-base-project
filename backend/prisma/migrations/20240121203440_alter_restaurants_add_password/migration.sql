/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Restaurant` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_cnpj_key` ON `Restaurant`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `Restaurant_email_key` ON `Restaurant`(`email`);
