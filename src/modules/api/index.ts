import { Module } from '@nestjs/common';
import { MenuModule } from '../menu';

@Module({
  imports: [MenuModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
