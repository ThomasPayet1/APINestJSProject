import { Module } from '@nestjs/common';
import { SalleMusculationController } from './salleMusculation.controller';
import { SalleMusculationService } from './salleMusculation.service';
import {HttpModule} from '@nestjs/axios';



@Module({
    imports: [HttpModule],
    controllers: [SalleMusculationController],
    providers: [SalleMusculationService],
})

export class SalleMusculationModule {}
