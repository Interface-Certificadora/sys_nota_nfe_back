-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "certificate_id" INTEGER;

-- CreateTable
CREATE TABLE "certificate" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "certificate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_certificate_id_fkey" FOREIGN KEY ("certificate_id") REFERENCES "certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
