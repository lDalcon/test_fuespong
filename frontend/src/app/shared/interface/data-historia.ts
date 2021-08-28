import { Proyecto } from "../model/proyecto";

export interface DataHistoria {
    visualizar: boolean,
    usrid: string,
    proyecto?: Proyecto
}