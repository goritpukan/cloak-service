import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CloakService } from './cloak.service';
import { RequestDto } from './dto/request.dto';
import { CheckResultEnum } from './types/check-result.type';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cloak Service')
@Controller()
export class CloakController {
  constructor(private readonly cloakService: CloakService) {}
  @Post('check')
  @HttpCode(200)
  @ApiOperation({ summary: 'Check if a request is from a bot or not' })
  @ApiBody({
    type: RequestDto,
    description: 'Request data including headers and IP',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns "bot" or "not bot"',
    schema: {
      type: 'string',
      enum: Object.values(CheckResultEnum),
      example: 'bot',
    },
  })
  async check(@Body() body: RequestDto): Promise<CheckResultEnum> {
    return await this.cloakService.check(body);
  }
}
