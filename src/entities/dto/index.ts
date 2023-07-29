import { Prisma } from '@prisma/client';

import { IsNotEmpty, IsString } from 'class-validator';

export class Menu implements Prisma.MenusCreateInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  qty: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  image: any;
}
