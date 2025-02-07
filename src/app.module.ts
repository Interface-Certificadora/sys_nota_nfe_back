import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './api/user/user.module';
import { LoginModule } from './api/login/login.module';
import { ClienteModule } from './api/cliente/cliente.module';
import { ParceiroModule } from './api/parceiro/parceiro.module';
import { CobrancaModule } from './api/cobranca/cobranca.module';

@Module({
  imports: [
    PrismaModule,
    LoginModule,
    UserModule,
    ClienteModule,
    ParceiroModule,
    CobrancaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
