import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UsersService } from '../users/users.service';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly usersService: UsersService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { userId, ...artistData } = createArtistDto;

    // Check if artist profile already exists for this user
    const existingArtist = await this.artistsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingArtist) {
      throw new ConflictException(
        'Artist profile already exists for this user',
      );
    }

    // Get the user and update their role to ARTIST
    const user = await this.usersService.findOne(userId);
    await this.usersService.update(userId, { role: Role.ARTIST });

    // Create new artist
    const artist = this.artistsRepository.create({
      ...artistData,
      user,
    });

    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async findByUserId(userId: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!artist) {
      throw new NotFoundException(
        `Artist not found for user with ID ${userId}`,
      );
    }

    return artist;
  }

  async update(id: string, updateArtistDto: Partial<Artist>): Promise<Artist> {
    const artist = await this.findOne(id);

    // Update artist
    Object.assign(artist, updateArtistDto);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const artist = await this.findOne(id);
    await this.artistsRepository.remove(artist);
  }
}
