import { Test, TestingModule } from '@nestjs/testing';
import { ParceiroController } from './parceiro.controller';
import { ParceiroService } from './parceiro.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

describe('ParceiroController', () => {
  let controller: ParceiroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [ParceiroController],
      providers: [ParceiroService],
    }).compile();

    controller = module.get<ParceiroController>(ParceiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
