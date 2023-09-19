import { Module } from '@nestjs/common';
import { VizyonController } from './vizyon.controller';
import { VizyonService } from './vizyon.service';


@Module({
  imports: [],
  providers: [VizyonService],
  controllers: [VizyonController],
  exports: []
})
export class VizyonModule {}