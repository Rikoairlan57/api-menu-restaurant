import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Menu } from 'src/entities/dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenu(data: Menu): Promise<Menu> {
    return this.prisma.menus.create({
      data: {
        title: data.title,
        description: data.description,
        qty: data.qty,
        price: data.price,
        from: data.from,
        image: data.image.secure_url,
      },
    });
  }

  async getAllMenus(): Promise<Menu[]> {
    return this.prisma.menus.findMany();
  }
}
