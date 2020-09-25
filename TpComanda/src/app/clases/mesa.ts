export class Mesa {
    constructor(public mesa_codigo :string,
    public nombre : string,
    public cuentacodigo : string,
    public estado : number
    ) { 
        this.mesa_codigo = mesa_codigo;
        this.nombre = nombre;
        this.cuentacodigo = cuentacodigo;
        this.estado = estado;
    }
}
