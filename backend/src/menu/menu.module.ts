import { Module } from '@nestjs/common';
import { CreateMenuItemController } from './controllers/create-menu-item.controller';
import { GetItemsByCategoryController } from './controllers/get-items-by-category.controller';
import { GetItemByIdController } from './controllers/get-item-by-id.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UpdateMenuItemController } from './controllers/update-menu-item.controller';
import { DeleteMenuItemController } from './controllers/delete-menu-item.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateMenuItemController,
    GetItemsByCategoryController,
    GetItemByIdController,
    UpdateMenuItemController,
    DeleteMenuItemController,
  ],
})
export class MenuModule {}
