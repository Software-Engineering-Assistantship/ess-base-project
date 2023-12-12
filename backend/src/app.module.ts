import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [MenuModule, ConfigModule.forRoot(), CategoriesModule],
})
export class AppModule {}
