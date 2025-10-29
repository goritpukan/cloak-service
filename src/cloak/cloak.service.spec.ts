import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CloakService } from './cloak.service';
import { Log } from './schemas/log.schema';
import { RequestDto } from './dto/request.dto';
import { CheckResultEnum } from './types/check-result.type';

describe('CloakService', () => {
  let service: CloakService;
  let mockSave: jest.Mock;

  const mockLogModel = {
    countDocuments: jest.fn(),
  };

  const mockRequest: RequestDto = {
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    acceptLanguage: 'en-US,en;q=0.9',
  };

  beforeEach(async () => {
    mockSave = jest.fn().mockResolvedValue(undefined);

    const MockLogModel = jest.fn().mockImplementation((data) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...data,
        save: mockSave,
      };
    });

    Object.assign(MockLogModel, mockLogModel);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloakService,
        {
          provide: getModelToken(Log.name),
          useValue: MockLogModel,
        },
      ],
    }).compile();

    service = module.get<CloakService>(CloakService);

    jest.clearAllMocks();
    mockLogModel.countDocuments.mockResolvedValue(0);
  });

  describe('check', () => {
    it('should return "bot" when headers are missing', async () => {
      const result = await service.check({ ...mockRequest, userAgent: '' });
      expect(result).toBe(CheckResultEnum.BOT);
    });

    it('should return "bot" for bot user agents', async () => {
      const result = await service.check({
        ...mockRequest,
        userAgent: 'Googlebot/2.1',
      });
      expect(result).toBe(CheckResultEnum.BOT);
    });

    it('should return "bot" when rate limit exceeded', async () => {
      mockLogModel.countDocuments.mockResolvedValue(101);
      const result = await service.check(mockRequest);
      expect(result).toBe(CheckResultEnum.BOT);
    });

    it('should return "not bot" for valid requests', async () => {
      mockLogModel.countDocuments.mockResolvedValue(10);
      const result = await service.check(mockRequest);
      expect(result).toBe(CheckResultEnum.NOT_BOT);
    });

    it('should create logs for all requests', async () => {
      await service.check(mockRequest);
      expect(mockSave).toHaveBeenCalled();
    });
  });
});
