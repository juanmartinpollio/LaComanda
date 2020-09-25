export class Producto {
    
     constructor(
         public codigo : number,
         public nombre : string,
         public tipo : any,
         public habilitado : any,
         public importe : number,
         public imagen : any
     ) 
     { 
         this.codigo = codigo;
         this.nombre = nombre;
         this.tipo = tipo;
         this.habilitado = habilitado;
         this.importe = importe;
         this.imagen = imagen;
     }
 }
 