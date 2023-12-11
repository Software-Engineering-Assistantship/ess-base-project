import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMenuItemController } from './controllers/create-menu-item.controller';
import { MenuService } from './services/menu.service';
import { GetItemsByCategory } from './controllers/get-items-by-category.controller';
import { GetItemById } from './controllers/get-item-by-id.controller';

@Module({
  controllers: [CreateMenuItemController, GetItemsByCategory, GetItemById],
  providers: [MenuService, PrismaService],
  exports: [MenuService],
})
export class MenuModule {}
