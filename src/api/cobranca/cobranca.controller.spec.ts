import { Test, TestingModule } from '@nestjs/testing';
import { CobrancaController } from './cobranca.controller';
import { CobrancaService } from './cobranca.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

describe('CobrancaController', () => {
  let controller: CobrancaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [CobrancaController],
      providers: [CobrancaService],
    }).compile();

    controller = module.get<CobrancaController>(CobrancaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
