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

export class CreateBookingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  @IsNotEmpty()
  artistId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ example: '2023-08-15T18:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '2023-08-15T20:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ example: 'Need additional microphones and speakers' })
  @IsString()
  @IsOptional()
  specialRequirements?: string;
}
