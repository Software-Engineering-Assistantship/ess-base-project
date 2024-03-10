-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "promotionId" TEXT;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
