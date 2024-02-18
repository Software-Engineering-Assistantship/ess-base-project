-- AlterTable
ALTER TABLE "category" ADD COLUMN     "restaurantId" TEXT;

-- CreateTable
CREATE TABLE "restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "closingTime" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_name_key" ON "restaurant"("name");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
