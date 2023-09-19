import { Get, Controller } from "@nestjs/common";
import { GelecekService } from "./gelecek.service";


@Controller('gelecek')
export class GelecekController{
constructor(private readonly GelecekService: GelecekService) {}

@Get()
async getData():Promise<any>{
return await this.GelecekService.dataReturn();
}

}