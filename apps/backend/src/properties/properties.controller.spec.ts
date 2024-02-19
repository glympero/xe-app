import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Area } from './entities/area.entity';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

const mockPropertiesService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: PropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: mockPropertiesService,
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of properties', async () => {
      const result = [
        {
          id: 1,
          title: 'Test Property',
          price: 1000000,
          type: 'Rent',
          area: {
            placeId: '1',
            mainText: 'Test Area',
            secondaryText: 'Test City',
            id: 1,
            properties: [],
          },
          description: 'Test Description',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single property', async () => {
      const id = '1';
      const result = {
        id: 1,
        title: 'Test Property',
        price: 1000000,
        type: 'Rent',
        area: {
          placeId: '1',
          mainText: 'Test Area',
          secondaryText: 'Test City',
          id: 1,
          properties: [],
        },
        description: 'Test Description',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(id)).toBe(result);
    });

    it('should throw NotFoundException if the property is not found', async () => {
      const id = '999';
      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        throw new NotFoundException();
      });

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
  describe('create', () => {
    it('should successfully create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        title: 'New Property',
        type: 'House',
        area: {
          placeId: '123',
          mainText: 'Main text',
          secondaryText: 'Secondary text',
        },
        price: 100000,
        description: 'Description of the property',
      };

      const area: Area = {
        placeId: '123',
        mainText: 'Main text',
        secondaryText: 'Secondary text',
        id: 1,
        properties: [],
      };
      const expectedResult = { id: 1, ...createPropertyDto, ...{ area } };

      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => expectedResult);

      expect(await controller.create(createPropertyDto)).toBe(expectedResult);
    });

    it('should throw ServiceUnavailableException if the service fails to create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        title: 'Failed Property',
        type: 'Apartment',
        area: {
          placeId: '456',
          mainText: 'Main text',
          secondaryText: 'Secondary text',
        },
        price: 200000,
        description: 'This should fail',
      };

      jest.spyOn(service, 'create').mockImplementation(async () => {
        throw new ServiceUnavailableException();
      });

      await expect(controller.create(createPropertyDto)).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('update', () => {
    it('should successfully update a property', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        title: 'Updated Property',
        type: 'Condo',
        area: {
          placeId: '789',
          mainText: 'Updated main text',
          secondaryText: 'Updated secondary text',
        },
        price: 150000,
        description: 'Updated description',
      };
      const id = '1';
      const expectedResult = { id: parseInt(id), ...updatePropertyDto };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => expectedResult as Property);

      expect(await controller.update(id, updatePropertyDto)).toBe(
        expectedResult,
      );
    });

    it('should throw NotFoundException if the property to update does not exist', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        title: 'Nonexistent Property',
        type: 'Villa',
        area: {
          placeId: '000',
          mainText: 'Nonexistent main text',
          secondaryText: 'Nonexistent secondary text',
        },
        price: 300000,
        description: 'This property does not exist',
      };
      const id = '9999';

      jest.spyOn(service, 'update').mockImplementation(async () => {
        throw new NotFoundException(`Property #${id} not found`);
      });

      await expect(controller.update(id, updatePropertyDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
