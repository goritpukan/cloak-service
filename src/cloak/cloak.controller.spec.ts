import { Test, TestingModule } from '@nestjs/testing';
import { CloakController } from './cloak.controller';
import { CloakService } from './cloak.service';
import { RequestDto } from './dto/request.dto';
import { CheckResultEnum } from './types/check-result.type';

const mockCloakService = {
  check: jest.fn(),
};

describe('CloakController', () => {
  let cloakController: CloakController;
  let cloakService: CloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloakController],
      providers: [{ provide: CloakService, useValue: mockCloakService }],
    }).compile();

    cloakController = module.get<CloakController>(CloakController);
    cloakService = module.get<CloakService>(CloakService);
  });

  describe('check', () => {
    it('should return "bot" or "not bot"', async () => {
      const request: RequestDto = {
        ip: '1.2.3.4',
        userAgent: 'Mozilla',
        acceptLanguage: 'en-US,en;q=0.9,fr;q=0.8',
      };
      jest
        .spyOn(cloakService, 'check')
        .mockResolvedValue(CheckResultEnum.NOT_BOT);

      const result = await cloakController.check(request);
      expect(result).toBe('not bot');
    });
  });
});
