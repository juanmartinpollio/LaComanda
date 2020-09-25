export class Cuenta {
    constructor(
        public codigo : number,
        public mesacodigo : any,
        public estado : any,
        public importe : number
    ) 
    { 
        this.codigo = codigo;
        this.mesacodigo = mesacodigo;
        this.estado = estado;
        this.importe = importe;
    }
}
