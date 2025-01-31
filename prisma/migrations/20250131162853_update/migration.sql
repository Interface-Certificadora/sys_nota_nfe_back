-- CreateTable
CREATE TABLE "Parceiros" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "chave_pix" TEXT,
    "telefone" TEXT,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parceiros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parceiros_cpf_key" ON "Parceiros"("cpf");
