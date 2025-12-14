/*
  Warnings:

  - A unique constraint covering the columns `[storeId,code]` on the table `Coupons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coupons_storeId_code_key" ON "Coupons"("storeId", "code");
