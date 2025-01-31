import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException } from '@nestjs/common';
// import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        name: 'JOHN DOE',
        email: 'john.doe@example.com',
        senha: 'password123',
        password: 'password123',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mocka o findFirst para retornar null (usuário não existe)
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

      // Mocka o create para retornar o mockUser
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      // Verifica se o resultado é o esperado
      expect(result).toEqual(mockUser);

      // Verifica se o findFirst foi chamado corretamente
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });

      // Verifica se o create foi chamado corretamente
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: createUserDto.name.toUpperCase(),
          email: createUserDto.email,
          password: expect.any(String), // A senha será hasheada
          senha: createUserDto.password,
          status: true,
        },
      });
    });

    it('should throw an error if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 1,
        name: 'JOHN DOE',
        email: 'john.doe@example.com',
        senha: 'password123',
        password: 'password123',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mocka o findFirst para retornar o mockUser (usuário já existe)
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);

      // Verifica se o método create lança uma exceção
      await expect(service.create(createUserDto)).rejects.toThrow(
        HttpException,
      );

      // Verifica se o findFirst foi chamado corretamente
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: createUserDto.email },
      });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
