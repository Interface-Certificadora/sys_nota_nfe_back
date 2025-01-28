-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "telefone" DROP NOT NULL,
ALTER COLUMN "telefone2" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Leads" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "fantasia" TEXT,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT,
    "razaoSocial" TEXT NOT NULL,
    "contador" TEXT,
    "telefone" TEXT,
    "whatsapp" BOOLEAN NOT NULL DEFAULT false,
    "telefone2" TEXT,
    "whatsapp2" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);
