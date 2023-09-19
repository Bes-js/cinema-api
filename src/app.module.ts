import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VizyonModule } from './vizyon/vizyon.module';
import { GelecekModule } from './gelecek/gelecek.module';

@Module({
  imports: [VizyonModule,GelecekModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
