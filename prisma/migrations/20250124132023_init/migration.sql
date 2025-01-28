-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "fantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "whatsapp" BOOLEAN NOT NULL,
    "telefone2" TEXT NOT NULL,
    "whatsapp2" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "ultimanota" TEXT,
    "vctoCd" TIMESTAMP(3),
    "valor" DOUBLE PRECISION NOT NULL,
    "plano" TEXT NOT NULL,
    "situacao" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dominio" TEXT NOT NULL,
    "contador" TEXT NOT NULL,
    "endereco" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "complemento" TEXT,
    "numero" TEXT,
    "fechamento" INTEGER NOT NULL,
    "teste" INTEGER NOT NULL,
    "vctoPlano" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
