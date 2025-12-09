/*
  Warnings:

  - You are about to drop the column `description` on the `Store` table. All the data in the column will be lost.
  - Changed the type of `role` on the `UserStoreRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'STAFF');

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "description",
ADD COLUMN     "category" TEXT,
ALTER COLUMN "currency" SET DEFAULT 'Rs';

-- AlterTable
ALTER TABLE "UserStoreRole" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
