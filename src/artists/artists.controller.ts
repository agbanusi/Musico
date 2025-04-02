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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new artist profile' })
  @ApiResponse({
    status: 201,
    description: 'Artist profile created successfully',
    type: Artist,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Artist profile already exists' })
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'Return all artists',
    type: [Artist],
  })
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an artist by id' })
  @ApiResponse({ status: 200, description: 'Return the artist', type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an artist profile' })
  @ApiResponse({
    status: 200,
    description: 'Artist profile updated successfully',
    type: Artist,
  })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: Partial<Artist>,
  ): Promise<Artist> {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an artist profile' })
  @ApiResponse({
    status: 200,
    description: 'Artist profile deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.artistsService.remove(id);
  }
}
