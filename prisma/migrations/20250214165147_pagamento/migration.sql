/*
  Warnings:

  - The primary key for the `certificate` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "certificate" DROP CONSTRAINT "certificate_pkey",
ADD COLUMN     "urlExt" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "validade" DROP NOT NULL,
ADD CONSTRAINT "certificate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "certificate_id_seq";
