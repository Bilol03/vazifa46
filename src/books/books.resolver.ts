import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput, @CurrentUser() user: any) {
    return this.booksService.update(updateBookInput.id, updateBookInput, user);
  }

  @Mutation(() => Book)
  @UseGuards(GqlAuthGuard)
  removeBook(@Args('id', { type: () => Int }) id: number, @CurrentUser() user: any) {
    return this.booksService.remove(id, user);
  }
}
