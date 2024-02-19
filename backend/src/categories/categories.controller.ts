import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.categoriesService.findByName(
      createCategoryDto.name,
      createCategoryDto.restaurantId,
    );

    if (categoryExists) {
      throw new HttpException(
        'Category name already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.categoriesService.create(createCategoryDto);
  }

  @Get('/restaurant/:restaurantId')
  async findAll(@Param('restaurantId') restaurantId: string) {
    return await this.categoriesService.findAll(restaurantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
    return 'Deleted item succesfully';
  }
}
