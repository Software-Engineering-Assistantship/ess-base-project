-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "comment" TEXT,
    "rate" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_menu" (
    "orderId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,

    CONSTRAINT "order_menu_pkey" PRIMARY KEY ("orderId","menuId")
);

-- AddForeignKey
ALTER TABLE "order_menu" ADD CONSTRAINT "order_menu_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_menu" ADD CONSTRAINT "order_menu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
