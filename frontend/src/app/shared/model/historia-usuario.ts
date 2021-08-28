import { Ticket } from "./tickets";

export class HistoriaUsuario {
    constructor(
        public hurid?: string,
	    public hurnombre?: string,
	    public hurrole?: string,
	    public hurfuncionalidad?: string,
	    public hurbeneficio?: string,
	    public hurcriaceptacion?: string,
	    public hurcomentarios?: string,
	    public hurproid?: string,
	    public hurusridcrea?: string,
	    public hurfechacrea?: string,
	    public hurusridmod?: string,
	    public hurfechamod?: string,
        public hurtickets?: Array<Ticket>
    ){}
}