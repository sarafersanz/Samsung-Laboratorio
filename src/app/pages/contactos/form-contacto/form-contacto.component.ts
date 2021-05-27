import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../../../models/persona';

interface Sexo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-contacto',
  templateUrl: 'form-contacto.component.html',
})

export class FormContactoComponent implements OnInit {

  public patternNoNumbers = "^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$";
  public alphanumeric = "^[a-zA-Z0-9]*$";
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
    this.setAction();
  }

  buildForm(){
    this.personaForm = this._formBuilder.group({
      _id: [this.local_data._id],
      nombre: [this.local_data.nombre, [Validators.required, Validators.minLength(4), Validators.pattern(this.patternNoNumbers)]],
      apellidos: [this.local_data.apellidos, [Validators.required, Validators.minLength(4), Validators.pattern(this.patternNoNumbers)]],
      edad: [this.local_data.edad, [Validators.required, Validators.min(0), Validators.max(125)]],
      dni: [this.local_data.dni, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(this.alphanumeric)]],
      cumple: [this.local_data.cumple, [Validators.required]],
      color: [this.local_data.color, [Validators.required, Validators.minLength(4), Validators.pattern(this.patternNoNumbers)]],
      sexo: [this.local_data.sexo, [Validators.required]],
      });
  }

  setAction() {
    if(this.action != 'Borrar'){
      this.action = (this.local_data._id) ? 'Editar' : 'Añadir';
    }
  }

  doAction(){
    if(this.action != 'Borrar'){
      this.dialogRef.close({event:this.action, data: this.personaForm.value});
    }else{
      this.dialogRef.close({event:this.action, data: this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancelar'});
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.personaForm.controls[controlName].hasError(errorName);
  }

}
