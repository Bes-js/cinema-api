import { Module } from "@nestjs/common";
import { GelecekService } from "./gelecek.service";
import { GelecekController } from "./gelecek.controller";

@Module({
providers:[GelecekService],
controllers:[GelecekController]
})
export class GelecekModule {}