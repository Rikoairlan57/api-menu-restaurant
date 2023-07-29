import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Menu } from 'src/entities/dto';
import { CloudinaryService } from 'src/services';
import { MenuService } from 'src/services/menu';

@Controller('menus')
export class MenusController {
  constructor(
    private cloudinaryService: CloudinaryService,
    private menusService: MenuService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadMenus(
    @UploadedFile() file: Express.Multer.File,
    @Body() menu: Menu,
  ): Promise<Menu> {
    const imgaeUrl = await this.cloudinaryService.uploadImage(file);
    const saveMenu = await this.menusService.createMenu({
      title: menu.title,
      description: menu.description,
      qty: menu.qty,
      price: menu.price,
      from: menu.from,
      image: imgaeUrl,
    });
    return saveMenu;
  }

  @Get()
  async getAllMenus(): Promise<Menu[]> {
    return this.menusService.getAllMenus();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menusService.getMenuByID(id);
  }
}
