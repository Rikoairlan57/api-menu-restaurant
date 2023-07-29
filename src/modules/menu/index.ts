import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary';
import { MenusController } from 'src/controllers';
import { MenuService } from 'src/services/menu';
import { PrismaService } from 'src/services';

@Module({
  imports: [CloudinaryModule],
  controllers: [MenusController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
