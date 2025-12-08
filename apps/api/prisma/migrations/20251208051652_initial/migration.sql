/*
  Warnings:

  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `UserStoreRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storeId` on the `UserStoreRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "UserStoreRole" DROP CONSTRAINT "UserStoreRole_storeId_fkey";

-- DropForeignKey
ALTER TABLE "UserStoreRole" DROP CONSTRAINT "UserStoreRole_userId_fkey";

-- AlterTable
ALTER TABLE "Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserStoreRole" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "storeId",
ADD COLUMN     "storeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserStoreRole_userId_storeId_key" ON "UserStoreRole"("userId", "storeId");

-- AddForeignKey
ALTER TABLE "UserStoreRole" ADD CONSTRAINT "UserStoreRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStoreRole" ADD CONSTRAINT "UserStoreRole_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
