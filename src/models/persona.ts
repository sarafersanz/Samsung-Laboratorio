export class Persona {

  _id?: number;
  nombre: string;
  apellidos: string;
  edad: number;
  dni: string;
  cumple: string;
  color: string;
  sexo: string;

  constructor() {
    this._id = 0;
    this.nombre = "";
    this.apellidos = "";
    this.edad = 0;
    this.dni = "";
    this.cumple = "";
    this.color = "";
    this.sexo = "";
  }
}
