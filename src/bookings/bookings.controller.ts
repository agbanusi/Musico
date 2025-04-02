import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    type: Booking,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings',
    type: [Booking],
  })
  async findAll(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a booking by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the booking',
    type: Booking,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking status' })
  @ApiResponse({
    status: 200,
    description: 'Booking status updated successfully',
    type: Booking,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
  ): Promise<Booking> {
    return this.bookingsService.updateStatus(id, status);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a booking' })
  @ApiResponse({
    status: 200,
    description: 'Booking updated successfully',
    type: Booking,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: Partial<Booking>,
  ): Promise<Booking> {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookingsService.remove(id);
  }
}
