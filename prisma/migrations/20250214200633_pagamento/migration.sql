-- DropForeignKey
ALTER TABLE "certificate" DROP CONSTRAINT "certificate_clientId_fkey";

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
