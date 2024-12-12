import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
    Put,
} from '@nestjs/common';
import type { SalleMusculation } from './SalleMusculation';
import { SalleMusculationService } from './salleMusculation.service';

@Controller('salleMusculation')
export class SalleMusculationController{
    constructor(private readonly salleMusculationService: SalleMusculationService) {}

    @Post()
    createSalleMusculation(@Body() salleMusculation: SalleMusculation): SalleMusculation {
        this.salleMusculationService.addSalleMusculation(salleMusculation);
        return this.salleMusculationService.getSalleMusculation(salleMusculation.id);
    }

    @Get()
    getAllSalleMusculation():SalleMusculation[]{
        return this.salleMusculationService.getAllSalleMusculation();
    }

    @Get(':id')
    getSalleMusculationById(@Param('id') id:string):SalleMusculation{
        return this.salleMusculationService.getSalleMusculation(id);
    }

    @Put(':id')
    setFavoris(@Param('id') id:string, @Body() favoris:boolean) : SalleMusculation {
        return this.salleMusculationService.setFavoris(id, favoris);
    }

    @Delete(':id')
    deleteSalleMusculation(@Param('id') id:string){
        this.salleMusculationService.removeSalleMusculation(id);
    }
    /*
    @Get('title')
    getSalleMusculationByTitle(@Param('title') title:string):SalleMusculation{
        return this.salleMusculationService.getSalleMusculationByTitle(title);
    }

    @Get('equipment')
    getSalleMusculationByEquipment(@Param('equipment') equipment:string):SalleMusculation[]{
        return this.salleMusculationService.getSalleMusculationByEquipment(equipment);
    }

    @Get('type')
    getSalleMusculationByType(@Param('type') type:string):SalleMusculation[]{
        return this.salleMusculationService.getSalleMusculationsOfType(type);
    }

    @Get('primer')
    getSalleMusculationByPrimer(@Param('primer') primer:string):SalleMusculation[]{
        return this.salleMusculationService.getSalleMusculationsofPrimer(primer);
    }
    */




}