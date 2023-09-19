import { Get, Controller } from '@nestjs/common';
import { VizyonService } from './vizyon.service';


@Controller('vizyon')
export class VizyonController {
  constructor(private readonly VizyonService: VizyonService) {}

  @Get()
  async getData():Promise<any>{
  return await this.VizyonService.dataReturn();
  }
  
 


}