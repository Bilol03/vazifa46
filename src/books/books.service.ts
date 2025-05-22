import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookInput: CreateBookInput) {
    const book = this.bookRepository.create(createBookInput);
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async update(id: number, updateBookInput: UpdateBookInput, user) {
    if (!user || user.role !== 'admin')
      throw new UnauthorizedException('Only admins can update books');
    const book = await this.findOne(id);
    Object.assign(book, updateBookInput);
    return this.bookRepository.save(book);
  }

  async remove(id: number, user) {
    if (!user || user.role !== 'admin')
      throw new UnauthorizedException('Only admins can update books');
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
    return book;
  }
}
