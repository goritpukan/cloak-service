import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestDto {
  @ApiProperty({ description: 'IPv4 of the request' })
  @IsNotEmpty({ message: 'IP is required' })
  @IsIP(4, { message: 'This field should be IPv4' })
  ip: string;

  @ApiProperty({ description: 'User agent for the request' })
  @IsOptional()
  @IsString({ message: 'User agent for the request is invalid' })
  userAgent?: string;

  @ApiProperty({ description: 'accept-language header' })
  @IsOptional()
  @IsString({ message: 'accept-language header invalid' })
  acceptLanguage?: string;
}
