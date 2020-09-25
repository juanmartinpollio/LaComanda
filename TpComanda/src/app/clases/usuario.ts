export class Usuario {
    constructor(public usuario:string,
    public contrasenia: string,
    public tipo: any,
    public estado : any,
    public imagen : any
    ) { 
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.tipo = tipo;
        this.estado = estado;
        this.imagen = imagen;
    }
}
