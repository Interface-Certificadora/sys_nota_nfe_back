import { Test, TestingModule } from '@nestjs/testing';
import { CobrancaService } from './cobranca.service';
import { CreateCobrancaDto } from './dto/create-cobranca.dto';
import { PrismaModule } from '../../prisma/prisma.module';
import { Cobranca } from './entities/cobranca.entity';

let CobrancaId = 3;
describe('CobrancaService', () => {
  let service: CobrancaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CobrancaService],
    }).compile();

    service = module.get<CobrancaService>(CobrancaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //teste de criação de cobranca
  describe('criar cobranca', () => {
    it('should create a new cobranca', async () => {
      const data: CreateCobrancaDto = {
        cliente_id: 74,
        valor: 50.75,
        venc: '2025-01-01',
        current: '01',
        status: true,
        obs: '',
        link_boleto: '',
      };
      const cobranca = (await service.create(data)) as Cobranca;
      CobrancaId = cobranca.id;
      expect(cobranca).toBeDefined();
      expect(cobranca).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          valor: expect.any(Number),
          venc: expect.any(String),
          current: expect.any(String),
          status: expect.any(Boolean),
          obs: expect.any(String),
          link_boleto: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          cliente: expect.any(Object),
        }),
      );
    });
  });

  //teste de atualização de cobranca
  describe('atualizar cobranca', () => {
    it('updated cobranca by id', async () => {
      const dataCobranca: CreateCobrancaDto = {
        cliente_id: 74,
        valor: 50.75,
        venc: '2025-02-01',
        current: '02',
        status: true,
        obs: '',
        link_boleto: '',
      };
      const cobrancaUpdate = await service.update(CobrancaId, dataCobranca);
      expect(cobrancaUpdate).toBeDefined();
      expect(cobrancaUpdate).toHaveProperty('id');
      expect(cobrancaUpdate).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          valor: expect.any(Number),
          venc: expect.any(String),
          current: expect.any(String),
          status: expect.any(Boolean),
          obs: expect.any(String),
          link_boleto: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          cliente: expect.any(Object),
        }),
      );
    });
  });

  //teste de busca de cobranca pelo ID
  describe('Buscar cobranca pelo ID', () => {
    it('should find a cobranca by id', async () => {
      const foundCobranca = await service.findOne(CobrancaId);
      expect(foundCobranca).toBeDefined();
      expect(foundCobranca).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          valor: expect.any(Number),
          venc: expect.any(String),
          current: expect.any(String),
          status: expect.any(Boolean),
          obs: expect.any(String),
          link_boleto: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          cliente: expect.any(Object),
        }),
      );
    });
  });

  //teste de busca de todas as cobrancas
  describe('Buscar todas as cobrancas', () => {
    it('should find all cobrancas', async () => {
      const cobrancas = (await service.findAll()) as Cobranca[];
      expect(cobrancas).toBeDefined();
      expect(cobrancas).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            valor: expect.any(Number),
            venc: expect.any(String),
            current: expect.any(String),
            status: expect.any(Boolean),
            obs: expect.any(String),
            link_boleto: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            cliente: expect.any(Object),
          }),
        ]),
      );
    });
  });

  //teste de exclusão de cobranca
  describe('Excluir cobranca pelo ID', () => {
    it('should delete a cobranca by id', async () => {
      const deletedCobranca = await service.remove(CobrancaId);
      expect(deletedCobranca).toBeDefined();
      expect(deletedCobranca).toHaveProperty('message');
      expect(deletedCobranca).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      );
    });
  });
});
