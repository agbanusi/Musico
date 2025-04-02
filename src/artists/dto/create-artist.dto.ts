import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'DJ Awesome' })
  @IsString()
  @IsNotEmpty()
  stageName: string;

  @ApiProperty({ example: 'Award-winning DJ with 10 years of experience' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @IsNotEmpty()
  hourlyRate: number;

  @ApiProperty({ example: ['Hip Hop', 'EDM', 'Pop'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  genres?: string[];

  @ApiProperty({ example: 'https://www.djawesome.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    example: [
      'https://instagram.com/djawesome',
      'https://twitter.com/djawesome',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  socialMediaLinks?: string[];

  @ApiProperty({
    example: [
      'https://example.com/music1.mp3',
      'https://example.com/video1.mp4',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mediaUrls?: string[];
}
