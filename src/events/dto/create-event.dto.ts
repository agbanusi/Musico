import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Summer Music Festival' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Annual music festival featuring top artists' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2023-08-15T18:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2023-08-15T23:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ example: 'Central Park, New York' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Main Stage' })
  @IsString()
  @IsOptional()
  venueDetails?: string;

  @ApiProperty({ example: 'https://example.com/poster.jpg' })
  @IsString()
  @IsOptional()
  eventPosterUrl?: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  expectedAttendees?: number;

  @ApiProperty({ example: 'Concert' })
  @IsString()
  @IsOptional()
  eventType?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  organizerId: string;
}
