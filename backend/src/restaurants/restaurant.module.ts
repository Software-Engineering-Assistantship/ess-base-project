import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RestaurantsController } from './controllers/restaurants.controller';
import { RestaurantsService } from './services/restaurants.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService],
})
export class RestaurantModule {}
