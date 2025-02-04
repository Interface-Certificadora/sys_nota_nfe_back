import { Test, TestingModule } from '@nestjs/testing';
import { ParceiroService } from './parceiro.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { Parceiro } from './entities/parceiro.entity';
import { UpdateParceiroDto } from './dto/update-parceiro.dto';

let ParceiroId = 3;
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

  //teste de criação de parceiro
  it('should create a new parceiro', async () => {
    const parceiro: CreateParceiroDto = {
      nome: 'John Doe',
      cpf: '652.123.456-89',
      chave_pix: '652.123.456-78',
      telefone: '(11) 1234-5675',
      whatsapp: true,
      email: 'teste@example.com',
      valor: 25,
    };

    const createdParceiro = (await service.create(parceiro)) as Parceiro;
    if (createdParceiro.id) {
      ParceiroId = createdParceiro.id;
    }
    expect(createdParceiro).toBeDefined();
    expect(createdParceiro).toHaveProperty('id');
    expect(createdParceiro).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: expect.any(String),
        cpf: expect.any(String),
        chave_pix: expect.any(String || null),
        telefone: expect.any(String || null),
        whatsapp: expect.any(Boolean),
      }),
    );
  });

  //teste de busca de parceiro
  describe('Buscar Parceiro pelo ID', () => {
    it('should find a parceiro by id', async () => {
      const foundParceiro = await service.findOne(ParceiroId); // Adicione o operador 'await'
      expect(foundParceiro).toBeDefined();
      expect(foundParceiro).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          cpf: expect.any(String),
          chave_pix: expect.any(String || null),
          telefone: expect.any(String || null),
          whatsapp: expect.any(Boolean),
          email: expect.any(String || null),
          valor: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  //teste de atualização de parceiro
  describe('atualizar parceiro', () => {
    it('updated parceiro by id', async () => {
      const dataParceiro: UpdateParceiroDto = {
        nome: '123 de oliveira 4',
      };
      const parceiroUpdate = await service.update(ParceiroId, dataParceiro); // Adicione o operador 'await'
      expect(parceiroUpdate).toBeDefined();
      expect(parceiroUpdate).toHaveProperty('id');
      expect(parceiroUpdate).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          nome: expect.any(String),
          cpf: expect.any(String),
          chave_pix: expect.any(String || null),
          telefone: expect.any(String || null),
          whatsapp: expect.any(Boolean),
          email: expect.any(String || null),
          valor: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  //teste de busca de todos os parceiros
  describe('Buscar todos os parceiros', () => {
    it('should find all parceiros', async () => {
      const parceiros = (await service.findAll()) as Parceiro[];
      expect(parceiros).toBeDefined();
      expect(parceiros).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            nome: expect.any(String),
            telefone: expect.any(String || null),
            whatsapp: expect.any(Boolean),
            email: expect.any(String || null),
          }),
        ]),
      );
    });
  });

  //teste de exclusão de parceiro
  describe('Excluir parceiro pelo ID', () => {
    it('should delete a parceiro by id', async () => {
      const deletedParceiro = await service.remove(ParceiroId);
      expect(deletedParceiro).toBeDefined();
      expect(deletedParceiro).toHaveProperty('message');
      expect(deletedParceiro).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        }),
      );
    });
  });
});
