-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "fantasia" DROP NOT NULL,
ALTER COLUMN "whatsapp" SET DEFAULT false,
ALTER COLUMN "whatsapp2" SET DEFAULT false,
ALTER COLUMN "situacao" SET DEFAULT true,
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "fechamento" SET DEFAULT 10,
ALTER COLUMN "teste" SET DEFAULT 10;
