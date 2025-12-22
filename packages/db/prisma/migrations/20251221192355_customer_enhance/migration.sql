-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "emailMarketing" BOOLEAN DEFAULT false,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "smsMarketing" BOOLEAN DEFAULT false;
