import { Body, Controller, Post } from '@nestjs/common';
import { CloakService } from './cloak.service';
import { RequestDto } from './dto/request.dto';
import { CheckResult } from './types/check-result.type';

@Controller()
export class CloakController {
  constructor(private readonly cloakService: CloakService) {}
  @Post('check')
  async check(@Body() body: RequestDto): Promise<CheckResult> {
    return await this.cloakService.check(body);
  }
}
