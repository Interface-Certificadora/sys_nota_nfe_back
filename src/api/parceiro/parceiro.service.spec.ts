import { Test, TestingModule } from '@nestjs/testing';
import { ParceiroService } from './parceiro.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ParceiroService', () => {
  let service: ParceiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule], // Adicione isso
      providers: [ParceiroService],
    }).compile();

    service = module.get<ParceiroService>(ParceiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
