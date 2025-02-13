-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "parceiro_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "venc" TEXT NOT NULL,
    "current" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_parceiro_id_fkey" FOREIGN KEY ("parceiro_id") REFERENCES "Parceiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
