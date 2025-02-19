/*
  Warnings:

  - You are about to drop the `Status_cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Status_cliente";

-- CreateTable
CREATE TABLE "RelatSms" (
    "id" SERIAL NOT NULL,
    "telefone" TEXT,
    "cliente_id" INTEGER NOT NULL,
    "mensagem" TEXT,
    "error_message" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "RelatSms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelatSms" ADD CONSTRAINT "RelatSms_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
