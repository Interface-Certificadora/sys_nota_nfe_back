/*
  Warnings:

  - You are about to drop the column `comissao` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `valor_comissao` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "comissao",
DROP COLUMN "valor_comissao";
