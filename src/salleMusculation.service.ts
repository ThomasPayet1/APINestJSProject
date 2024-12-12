
import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { SalleMusculation } from './SalleMusculation';
import {HttpModule, HttpService} from '@nestjs/axios';
import {AxiosResponse} from "axios";
import {SalleMusculationGlobalAPI} from "./SalleMusculationGlobalAPI";
import {SalleMusculationAPI} from "./SalleMusculationAPI";


@Injectable()
export class SalleMusculationService implements OnModuleInit {
    private readonly salleMusculationStock: Map<string, SalleMusculation> = new Map();

    async onModuleInit() {
        Promise.all([this.loadSalleMusculationFromFile(), this.readSalleMusculationOnline()]).then(
            () => {
                console.log("Initialisation terminée.");
                console.log(this.getAllSalleMusculation());
            });
    }

    async loadSalleMusculationFromFile(): Promise<SalleMusculationAPI[]> {
        const data = await readFile('../salleMusculation.json', 'utf-8');
        const salleMusculationGlobalAPIS: SalleMusculationGlobalAPI[] = JSON.parse(data);
        salleMusculationGlobalAPIS["results"].forEach((salleMusculation) => {
            this.addSalleMusculation({
                id: salleMusculation.inst_numero,
                name: salleMusculation.inst_nom,
                addr: salleMusculation.inst_adresse,
                dateCreation: salleMusculation.inst_date_creation,
                comName: salleMusculation.inst_com_nom,
                equipTypeName: salleMusculation.equip_type_name,
                equipTypeFamille: salleMusculation.equip_type_famille,
                coordonnees: salleMusculation.coordonnees,
                equipApsName: salleMusculation.equip_aps_nom,
                regName: salleMusculation.reg_nom,
                favoris: false,
            });
        });
        console.log(this.getAllSalleMusculation());
        return salleMusculationGlobalAPIS["results"];
    }

    async readSalleMusculationOnline(): Promise<SalleMusculation[]> {
        const httpService: HttpService = new HttpService();
        const response: AxiosResponse<SalleMusculationGlobalAPI[]> = await httpService.get<SalleMusculationGlobalAPI[]>('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/data-es@ra-normandie-dataeducation/records?limit=100').toPromise();
        const salleMusculationGlobalAPIS = response.data;

        if (!salleMusculationGlobalAPIS || !salleMusculationGlobalAPIS["results"]) {
            console.error('Invalid data received from the API');
            return [];
        }

        salleMusculationGlobalAPIS["results"].forEach((salleMusculation) => {
            this.addSalleMusculation({
                id: salleMusculation.inst_numero,
                name: salleMusculation.inst_nom,
                addr: salleMusculation.inst_adresse,
                dateCreation: salleMusculation.inst_date_creation,
                comName: salleMusculation.inst_com_nom,
                equipTypeName: salleMusculation.equip_type_name,
                equipTypeFamille: salleMusculation.equip_type_famille,
                coordonnees: salleMusculation.coordonnees,
                equipApsName: salleMusculation.equip_aps_nom,
                regName: salleMusculation.reg_nom,
                favoris: false,
            });
        });
        return salleMusculationGlobalAPIS["results"];
    }

    addSalleMusculation(SalleMusculation: SalleMusculation) {
        this.salleMusculationStock.set(SalleMusculation.id, SalleMusculation);
    }

    setFavoris(id: string, favoris: boolean): SalleMusculation {
        const elem = this.getSalleMusculation(id);
        elem.favoris = favoris;
        this.salleMusculationStock.set(id, elem);
        return elem
    }


    getAllInfosImportantes(): string[][] {
        return this.getAllSalleMusculation().map((elem) => [elem.name, elem.addr, elem.comName, elem.equipTypeName, elem.regName]);
    }

    getSalleMusculation(id: string): SalleMusculation {
        return this.salleMusculationStock.get(id);
    }

    getAllSalleMusculation(): SalleMusculation[] {
        return Array.from(this.salleMusculationStock.values()).sort((a, b) => a.comName.localeCompare(b.comName));
    }
    /*
    getSalleMusculationsOfType(type: string): SalleMusculation[] {
        return this.getAllSalleMusculations().filter((SalleMusculation) => SalleMusculation.type === type).sort((a, b) => a.title.localeCompare(b.title));
    }

    getSalleMusculationsofPrimer(primer: string): SalleMusculation[] {
        return this.getAllSalleMusculations().filter((SalleMusculation) => SalleMusculation.primer == primer).sort((a, b) => a.title.localeCompare(b.title));
    }

    getSalleMusculationByTitle(title: string): SalleMusculation {
        return this.getAllSalleMusculations().find((SalleMusculation) => SalleMusculation.title === title);
    }

    getSalleMusculationByEquipment(equipment:string):SalleMusculation[]{
        return this.getAllSalleMusculations().filter((SalleMusculation) => SalleMusculation.equipment === equipment).sort((a, b) => a.title.localeCompare(b.title));
    }
    */

    removeSalleMusculation(id: string) {
        return this.salleMusculationStock.delete(id);
    }

    updateSalleMusculation(SalleMusculation: SalleMusculation) {
        return this.salleMusculationStock.set(SalleMusculation.id, SalleMusculation);
    }

}