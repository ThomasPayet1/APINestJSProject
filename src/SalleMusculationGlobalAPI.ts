

/* *

This interface will read the information from the URL
After this, we can convert the information to the right interface Exercice
* */
import {SalleMusculationAPI} from "./SalleMusculationAPI";

export interface SalleMusculationGlobalAPI{
    totalCount:string;
    result:SalleMusculationAPI[];
}