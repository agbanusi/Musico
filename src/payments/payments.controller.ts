import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment created successfully',
    type: Payment,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'Return all payments',
    type: [Payment],
  })
  async findAll(): Promise<Payment[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a payment by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the payment',
    type: Payment,
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentsService.findOne(id);
  }

  @Get('booking/:bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment by booking id' })
  @ApiResponse({
    status: 200,
    description: 'Return the payment',
    type: Payment,
  })
  async findByBookingId(
    @Param('bookingId') bookingId: string,
  ): Promise<Payment | null> {
    return this.paymentsService.findByBookingId(bookingId);
  }
}
