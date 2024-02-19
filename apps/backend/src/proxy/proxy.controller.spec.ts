import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { HttpModule } from '@nestjs/axios';

const mockData = { data: 'Mock Data' };

const mockProxyService = {
  makeRequest: jest.fn().mockImplementation(() => Promise.resolve(mockData)),
};

describe('ProxyController', () => {
  let controller: ProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ProxyController],
      providers: [
        {
          provide: ProxyService,
          useValue: mockProxyService,
        },
      ],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return data when makeRequest is successful', async () => {
    const input = 'test-query';
    await expect(controller.getProxyData(input)).resolves.toEqual(mockData);
    expect(mockProxyService.makeRequest).toHaveBeenCalledWith(input);
  });
});
