/*
  Warnings:

  - You are about to drop the column `comissao_id` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "comissao_id",
ADD COLUMN     "parceiro_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_parceiro_id_fkey" FOREIGN KEY ("parceiro_id") REFERENCES "Parceiros"("id") ON DELETE SET NULL ON UPDATE CASCADE;
