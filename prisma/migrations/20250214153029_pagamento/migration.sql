/*
  Warnings:

  - You are about to drop the column `certificate_id` on the `Client` table. All the data in the column will be lost.
  - Made the column `updatedAt` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clientId` to the `certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validade` to the `certificate` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `certificate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_certificate_id_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "certificate_id",
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "certificate" ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "validade" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
