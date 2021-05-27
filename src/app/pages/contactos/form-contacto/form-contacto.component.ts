import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
//import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../../models/persona';

/* export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
}; */

interface Sexo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-contacto',
  templateUrl: 'form-contacto.component.html',
  /* providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ] */
})

export class FormContactoComponent implements OnInit {

  public action:string;
  public local_data:any;
  public personaForm: FormGroup;
  public sexo: Sexo[] = [
    {value: 'Hombre', viewValue: 'Hombre'},
    {value: 'Mujer', viewValue: 'Mujer'},
    {value: 'No especificado', viewValue: 'No especificado'},
    {value: 'Otro', viewValue: 'Otro'}
  ];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormContactoComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Persona) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }
  ngOnInit(): void {
    this.buildForm();
    console.log(this.local_data.cumple);

    this.setAction();
  }

  buildForm(){
    this.personaForm = this._formBuilder.group({
      id: [this.local_data.id],
      nombre: [this.local_data.nombre, [Validators.required, Validators.minLength(3)]],
      apellidos: [this.local_data.apellidos, [Validators.required, Validators.minLength(3)]],
      edad: [this.local_data.edad, [Validators.required, Validators.min(0), Validators.max(125)]],
      dni: [this.local_data.dni, [Validators.required, Validators.minLength(9)]],
      cumple: [this.local_data.cumple, [Validators.required]],
      color: [this.local_data.color, [Validators.required, Validators.minLength(3)]],
      sexo: [this.local_data.sexo, [Validators.required]],
      });
  }

  setAction() {
    if(this.action != 'Borrar'){
      this.action = (this.local_data.id) ? 'Editar' : 'Añadir';
    }
  }

  doAction(){
    if(this.action != 'Borrar'){
      var dateFormat = new DatePipe('en').transform(this.personaForm.controls['cumple'].value, 'dd/MM/yyyy');
      this.personaForm.controls['cumple'].setValue(dateFormat);
      this.dialogRef.close({event:this.action, data: this.personaForm.value});
    }else{
      this.dialogRef.close({event:this.action, data: this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancelar'});
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.personaForm.get('cumple').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.personaForm.controls[controlName].hasError(errorName);
  }
  /* public errorHandling = (control: string, error: string) => {
    return this.personaForm.controls[control].hasError(error);
  } */

}
