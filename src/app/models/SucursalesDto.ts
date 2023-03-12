import { getLocaleDateTimeFormat } from "@angular/common";

export class SucursalesDto{
    id            :number = 0;
    codigo        :number = 0;
    descripcion   :string = '';
    direccion     :string = '';
    identificacion:string = '';
    fechaCreacion :Date;
    idMoneda      :number = 0;
 }