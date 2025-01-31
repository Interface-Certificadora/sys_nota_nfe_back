import { Module } from '@nestjs/common';
import { ParceiroService } from './parceiro.service';
import { ParceiroController } from './parceiro.controller';

@Module({
  controllers: [ParceiroController],
  providers: [ParceiroService],
})
export class ParceiroModule {}
