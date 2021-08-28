import { Ticket } from "../model/tickets";

export interface DataTicket {
    hurid: string;
    usrid: string;
    editar: boolean;
    visualizar: boolean;
    ticket?: Ticket;
}