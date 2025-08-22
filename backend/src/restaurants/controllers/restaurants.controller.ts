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
import { RestaurantsService } from '../services/restaurants.service';
import { CreateRestaurantSchema } from '../dto/create-restaurant';
import { UpdateRestaurantSchema } from '../dto/update-restaurant';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(@Body() restaurant: CreateRestaurantSchema) {
    const nameExists = await this.restaurantsService.findByName(
      restaurant.name,
    );

    if (nameExists) {
      throw new HttpException(
        'Restaurant name already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.restaurantsService.create({
      name: restaurant.name,
      address: restaurant.address,
      closingTime: restaurant.closingTime,
      type: restaurant.type,
      picture: restaurant.picture,
    });
  }

  @Get()
  async findAll() {
    return await this.restaurantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() restaurant: UpdateRestaurantSchema,
  ) {
    const idExists = await this.restaurantsService.findOne(id);
    if (!idExists) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    if (restaurant.name) {
      const nameExists = await this.restaurantsService.findByName(
        restaurant.name,
        id,
      );

      if (nameExists) {
        throw new HttpException(
          'Restaurant name already taken',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.restaurantsService.update(id, {
      name: restaurant.name,
      address: restaurant.address,
      closingTime: restaurant.closingTime,
      type: restaurant.type,
      picture: restaurant.picture,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.restaurantsService.remove(id);
    return true;
  }
}
