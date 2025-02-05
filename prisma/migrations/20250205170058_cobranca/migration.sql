/*
  Warnings:

  - Made the column `whatsapp` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsapp2` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whatsapp_cont` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "whatsapp" SET NOT NULL,
ALTER COLUMN "whatsapp2" SET NOT NULL,
ALTER COLUMN "whatsapp_cont" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Cobranca" ADD CONSTRAINT "Cobranca_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
