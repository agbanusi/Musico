import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ example: 'tx_123456789' })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({
    example: {
      cardLast4: '4242',
      cardBrand: 'visa',
    },
  })
  @IsObject()
  @IsOptional()
  paymentDetails?: Record<string, any>;
}
