-- CreateTable
CREATE TABLE "Cobranca" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "venc" TEXT NOT NULL,
    "current" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "obs" TEXT NOT NULL,
    "link_boleto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status_cliente" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_cliente_pkey" PRIMARY KEY ("id")
);
