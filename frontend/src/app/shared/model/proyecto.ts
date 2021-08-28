import { HistoriaUsuario } from "./historia-usuario";

export class Proyecto {
    constructor(
        public proid?: string,
	    public pronombre?: string,
	    public prousrid?: string,
	    public proempid?: string,
        public prohistorias?: Array<HistoriaUsuario>
    ){}
}