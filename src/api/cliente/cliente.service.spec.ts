// src/api/cliente/cliente.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

const createClienteDto: CreateClienteDto = {
  cliente: 'John Doe',
  email: 'john.doe@example.com',
  telefone: '123456789',
  fantasia: '',
  cnpj: '',
  ie: '',
  razaoSocial: '',
  whatsapp: false,
  telefone2: '',
  whatsapp2: false,
  user: '',
  password: '',
  logo: '',
  ultimanota: '',
  serie: '',
  vctoCd: undefined,
  valor: 0,
  plano: '',
  situacao: '',
  simples: false,
  status: false,
  dominio: '',
  contador: '',
  endereco: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
  complemento: '',
  numero: '',
  fechamento: 0,
  teste: 0,
  vctoPlano: undefined,
  comissao: false,
  valor_comissao: 0,
  justificativa: '',
  certificado: '',
  key_certificado: '',
  tel_contador: '',
  whatsapp_cont: false,
  comissao_id: 0,
};

const mockCliente: Cliente = {
  id: 1,
  ...createClienteDto,
  sefaz: false,
  createdAt: undefined,
  updatedAt: undefined,
};

const mockClientes = [
  {
    ...mockCliente,
  },
  {
    ...mockCliente,
    id: 2,
  },
];

const updateClienteDto: UpdateClienteDto = {
  ...createClienteDto,
  email: 'jane.doe@example.com',
  telefone: '987654321',
};

describe('ClienteService', () => {
  
  let service: ClienteService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: PrismaService,
          useValue: {
            client: {
              findMany: jest.fn(),
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cliente', async () => {
      jest.spyOn(prismaService.client, 'create').mockResolvedValue(mockCliente);

      const result = await service.create(createClienteDto);

      expect(result).toEqual(mockCliente);
      expect(prismaService.client.create).toHaveBeenCalledWith({
        data: createClienteDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all clientes', async () => {
      jest
        .spyOn(prismaService.client, 'findMany')
        .mockResolvedValue(mockClientes);

      const result = await service.findAll();

      expect(result).toEqual(mockClientes);
      expect(prismaService.client.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a cliente by id', async () => {
      const id = 1;

      jest
        .spyOn(prismaService.client, 'findUnique')
        .mockResolvedValue(mockCliente);

      const result = await service.findOne(id);

      expect(result).toEqual(mockCliente);
      expect(prismaService.client.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a cliente', async () => {
      const id = 1;

      jest.spyOn(prismaService.client, 'update').mockResolvedValue(mockCliente);

      const result = await service.update(id, updateClienteDto);

      expect(result).toEqual(mockCliente);
      expect(prismaService.client.update).toHaveBeenCalledWith({
        where: { id },
        data: updateClienteDto,
      });
    });
  });

  describe('remove', () => {
    it('should update the status of the cliente to false', async () => {
      const id = 1;

      const result = await service.remove(id);

      expect(result).toEqual({
        status: 'OK',
        message: 'Cliente removido com sucesso',
      });
      expect(prismaService.client.update).toHaveBeenCalledWith({
        where: { id },
        data: { status: false },
      });
    });
  });
});
