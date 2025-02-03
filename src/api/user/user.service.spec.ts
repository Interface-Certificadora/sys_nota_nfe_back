import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;
  // let prismaService: PrismaService;

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
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a new user', async () => {
  //     const createUserDto = {
  //       name: 'John Doe2',
  //       email: 'john3.doe@example.com',
  //       password: 'password123',
  //       status: true,
  //     };

  //     const result = await service.create(createUserDto);

  //     if (result instanceof Error) {
  //       expect(result).toEqual(
  //         expect.objectContaining({
  //           message: expect.any(String),
  //         }),
  //       );
  //     }

  //     // expect(result).toBeInstanceOf(User); // Verifica se o resultado é uma instância de User
  //     expect(result).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         name: expect.any(String),
  //         email: expect.any(String),
  //         password: expect.any(String),
  //         status: expect.any(Boolean),
  //         createdAt: expect.any(Date),
  //         updatedAt: expect.any(Date),
  //       }),
  //     );
  //     expect(prismaService.user.findFirst).toHaveBeenCalledWith({
  //       where: { email: createUserDto.email },
  //     });
  //     expect(prismaService.user.create).toHaveBeenCalledWith({
  //       data: {
  //         name: expect.any(String),
  //         email: expect.any(String),
  //         password: expect.any(String),
  //         status: true,
  //       },
  //     });
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return all users', async () => {
  //     jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           id: expect.any(Number),
  //           name: expect.any(String),
  //           email: expect.any(String),
  //           password: expect.any(String),
  //           status: expect.any(Boolean),
  //           createdAt: expect.any(Date),
  //           updatedAt: expect.any(Date),
  //         }),
  //       ]),
  //     );

  //     const result = await service.findAll();

  //     expect(result).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           id: expect.any(Number),
  //           name: expect.any(String),
  //           email: expect.any(String),
  //           password: expect.any(String),
  //           status: expect.any(Boolean),
  //           createdAt: expect.any(Date),
  //           updatedAt: expect.any(Date),
  //         }),
  //       ]),
  //     );
  //     expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
  //   });
  // });
});
