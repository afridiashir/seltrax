-- CreateTable
CREATE TABLE "paymentMethods" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
