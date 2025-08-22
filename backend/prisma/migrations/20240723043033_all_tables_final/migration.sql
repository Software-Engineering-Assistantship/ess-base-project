-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('ILIMITADA', 'LIMITE_QUARTO');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('CREDITO', 'DEBITO');

-- CreateTable
CREATE TABLE "hotelier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "n_address" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "hotelier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishedReservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "people" INTEGER NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "airConditioner" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "room_service" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "promotion_id" INTEGER,
    "hotelier_id" INTEGER NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "publishedReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserve" (
    "id" SERIAL NOT NULL,
    "num_rooms" INTEGER NOT NULL,
    "checkin" TEXT NOT NULL,
    "checkout" TEXT NOT NULL,
    "num_adults" INTEGER NOT NULL,
    "num_children" INTEGER NOT NULL,
    "paymentMethodName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "publishedReservationId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,

    CONSTRAINT "reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "discount" INTEGER NOT NULL,
    "type" "PromotionType" NOT NULL,
    "num_rooms" INTEGER,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientSavedReservation" (
    "client_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,

    CONSTRAINT "clientSavedReservation_pkey" PRIMARY KEY ("client_id","reservation_id")
);

-- CreateTable
CREATE TABLE "rateReservation" (
    "client_id" INTEGER NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comments" TEXT,

    CONSTRAINT "rateReservation_pkey" PRIMARY KEY ("client_id","reservation_id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numCard" TEXT NOT NULL,
    "cvv" INTEGER NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "clientId" INTEGER NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hotelier_email_key" ON "hotelier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hotelier_username_key" ON "hotelier"("username");

-- CreateIndex
CREATE UNIQUE INDEX "hotelier_cnpj_key" ON "hotelier"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_username_key" ON "client"("username");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_key" ON "client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "rateReservation_reservation_id_key" ON "rateReservation"("reservation_id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_clientId_numCard_key" ON "PaymentMethod"("clientId", "numCard");

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publishedReservation" ADD CONSTRAINT "publishedReservation_hotelier_id_fkey" FOREIGN KEY ("hotelier_id") REFERENCES "hotelier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_publishedReservationId_fkey" FOREIGN KEY ("publishedReservationId") REFERENCES "publishedReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserve" ADD CONSTRAINT "reserve_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientSavedReservation" ADD CONSTRAINT "clientSavedReservation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientSavedReservation" ADD CONSTRAINT "clientSavedReservation_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "publishedReservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rateReservation" ADD CONSTRAINT "rateReservation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rateReservation" ADD CONSTRAINT "rateReservation_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reserve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
