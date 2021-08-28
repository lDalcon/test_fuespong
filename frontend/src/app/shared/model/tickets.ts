export class Ticket {
    constructor(
        public ticid?: number,
        public ticnombre?: string,
        public ticcomentarios?: string,
        public tichurid?: string,
        public ticusridcrea?: string,
        public ticfechacrea?: string,
        public ticusridmod?: string,
        public ticfechamod?: string,
        public ticestado?: number
    ){}
}