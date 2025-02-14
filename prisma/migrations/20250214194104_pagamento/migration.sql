/*
  Warnings:

  - You are about to drop the column `urlExt` on the `certificate` table. All the data in the column will be lost.
  - Added the required column `fieldname` to the `certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "certificate" DROP COLUMN "urlExt",
ADD COLUMN     "destination" TEXT,
ADD COLUMN     "encoding" TEXT,
ADD COLUMN     "fieldname" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "mimetype" TEXT,
ADD COLUMN     "originalname" TEXT,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "size" INTEGER;
