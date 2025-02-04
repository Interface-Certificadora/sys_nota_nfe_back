import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
// import { UpdateClienteDto } from './dto/update-cliente.dto';
// import { CreateClienteDto } from './dto/create-cliente.dto';
import { PrismaModule } from '../../prisma/prisma.module';

// const createClienteDto: CreateClienteDto = {
//   cliente: 'John Doe',
//   email: 'john.doe@example.com',
//   telefone: '123456789',
//   fantasia: '',
//   cnpj: '',
//   ie: '',
//   razaoSocial: '',
//   whatsapp: false,
//   telefone2: '',
//   whatsapp2: false,
//   user: '',
//   password: '',
//   logo: '',
//   ultimanota: '',
//   serie: '',
//   vctoCd: undefined,
//   valor: 0,
//   plano: '',
//   situacao: '',
//   simples: false,
//   status: false,
//   dominio: '',
//   contador: '',
//   endereco: '',
//   bairro: '',
//   cidade: '',
//   uf: '',
//   cep: '',
//   complemento: '',
//   numero: '',
//   fechamento: 0,
//   teste: 0,
//   vctoPlano: undefined,
//   comissao: false,
//   valor_comissao: 0,
//   justificativa: '',
//   certificado: '',
//   key_certificado: '',
//   tel_contador: '',
//   whatsapp_cont: false,
//   comissao_id: 0,
// };

describe('ClienteController', () => {
  let controller: ClienteController;
  // let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule], // Adicione isso
      controllers: [ClienteController],
      providers: [ClienteService],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    // service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return all clientes', async () => {
  //     jest.spyOn(service, 'findAll');
  //     const result = await controller.findAll();

  //     expect(result).toEqual(
  //       expect.arrayContaining([
  //         expect.objectContaining({
  //           id: expect.any(Number),
  //           cliente: expect.any(String),
  //         }),
  //       ]),
  //     );
  //     expect(service.findAll).toHaveBeenCalledTimes(7);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a cliente by id', async () => {
  //     const id = '7';

  //     const result = await controller.findOne(id);

  //     expect(result).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         cliente: expect.any(String),
  //       }),
  //     );
  //     expect(service.findOne).toHaveBeenCalledWith(id);
  //   });
  // });

  // describe('create', () => {
  //   it('should create a new cliente', async () => {
  //     const result = await controller.create(createClienteDto);

  //     expect(result).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         cliente: expect.any(String),
  //       }),
  //     );
  //     expect(service.create).toHaveBeenCalledWith();
  //   });
  // });

  // describe('update', () => {
  //   it('should update a cliente', async () => {
  //     const id = '7';
  //     const mockCliente: Partial<UpdateClienteDto> = { cliente: 'John Doe' };
  //     const updateClienteDto: UpdateClienteDto =
  //       mockCliente as UpdateClienteDto;

  //     const result = await controller.update(id, updateClienteDto);

  //     expect(result).toEqual(updateClienteDto);
  //     expect(service.update).toHaveBeenCalledWith(id, updateClienteDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a cliente', async () => {
  //     const id = '7';

  //     const result = await controller.remove(id);

  //     expect(result).toEqual(
  //       expect.objectContaining({
  //         status: expect.any(String),
  //         message: expect.any(String),
  //       }),
  //     );
  //     expect(service.remove).toHaveBeenCalledWith(id);
  //   });
  // });
});
