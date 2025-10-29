import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    description: 'IPv4 of the request',
    example: '127.0.0.1',
    required: true,
  })
  @IsNotEmpty({ message: 'IP is required' })
  @IsIP(4, { message: 'This field should be IPv4' })
  ip: string;

  @ApiProperty({
    description: 'User agent for the request',
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.117 Safari/537.36',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'User agent for the request is invalid' })
  userAgent?: string;

  @ApiProperty({
    description: 'Accept-Language header of the request',
    example: 'en-US,en;q=0.9,fr;q=0.8',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'accept-language header invalid' })
  acceptLanguage?: string;
}
