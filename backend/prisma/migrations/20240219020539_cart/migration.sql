-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "cartId" TEXT;

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "totalSum" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
