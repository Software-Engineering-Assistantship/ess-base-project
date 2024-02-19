-- CreateTable
CREATE TABLE "promotion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuToPromotion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToPromotion_AB_unique" ON "_MenuToPromotion"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToPromotion_B_index" ON "_MenuToPromotion"("B");

-- AddForeignKey
ALTER TABLE "_MenuToPromotion" ADD CONSTRAINT "_MenuToPromotion_A_fkey" FOREIGN KEY ("A") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToPromotion" ADD CONSTRAINT "_MenuToPromotion_B_fkey" FOREIGN KEY ("B") REFERENCES "promotion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
