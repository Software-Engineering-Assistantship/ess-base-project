import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaMenuService } from 'src/menu/services/menu.service';
import { MenuService } from 'src/interfaces/menu-service';

@Module({
  providers: [
    PrismaService,
    {
      provide: MenuService,
      useClass: PrismaMenuService,
    },
  ],
  exports: [MenuService],
})
export class DatabaseModule {}
