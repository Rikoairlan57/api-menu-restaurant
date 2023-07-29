import {
  Body,
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
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
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    const saveMenu = await this.menusService.createMenu({
      title: menu.title,
      description: menu.description,
      qty: menu.qty,
      price: menu.price,
      from: menu.from,
      image: imageUrl,
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

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateBook(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatedMenu: Menu,
  ): Promise<Menu> {
    let imageUrl = updatedMenu.image;

    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      imageUrl = uploadedImage.secure_url;
    }

    const menu: Menu = {
      ...updatedMenu,
      image: imageUrl,
    };

    return this.menusService.updateMenu(id, menu);
  }

  @Delete(':id')
  async deleteMenuById(@Param('id') id: number): Promise<{ message: string }> {
    const menu = await this.menusService.getMenuByID(id);
    if (!menu) {
      throw new NotFoundException('Menu Not Found');
    }

    await this.menusService.deleteMenuById(id);
    return { message: 'Delete menu successfuly' };
  }
}
