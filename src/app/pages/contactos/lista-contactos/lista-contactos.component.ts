//app.component.ts
import { Component, ViewChild } from '@angular/core';
import { Persona } from '../../../../models/persona';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormContactoComponent } from '../form-contacto/form-contacto.component';
import { PersonasService } from 'src/services/personas.service';

@Component({
  selector: 'app-lista-contactos',
  styleUrls: ['lista-contactos.component.scss'],
  templateUrl: 'lista-contactos.component.html',
})
export class ListaContactosComponent {
  public dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellidos',
    'edad',
    'dni',
    'cumple',
    'color',
    'sexo',
    'action',
  ];

  public listaPersonas: Persona[];
  public loading: boolean;
  public sinPersonas: boolean;
  public errorMsg: string;

  @ViewChild(MatTableDataSource, { static: true })
  table: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private _personasService: PersonasService
  ) {}

  ngOnInit(): void {
    this.getListadoPersonas();
  }

  public getListadoPersonas() {
    this._personasService.listadoPersonas().subscribe(
      (response: any) => {
        if (response) {
          this.listaPersonas = response;
          this.dataSource.data = this.listaPersonas;
          this.loading = false;
        } else {
          this.sinPersonas = true;
          this.loading = false;
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  }

  openDialog(action, obj) {
    obj.action = action;
    console.log(obj.action);

    this.dialog
      .open(FormContactoComponent, {
        disableClose: true,
        data: obj,
        width: '550px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.event === 'Añadir') {
          this.addRowData(result.data);
        } else if (result.event === 'Editar') {
          this.updateRowData(result.data);
        } else if (result.event == 'Borrar') {
          this.deleteRowData(result.data);
        }
      });
  }

  addRowData(row_obj) {
    this.loading = true;
    let args = {
      nombre: row_obj.nombre,
      apellidos: row_obj.apellidos,
      edad: row_obj.edad,
      dni: row_obj.dni,
      cumple: row_obj.cumple,
      color: row_obj.color,
      sexo: row_obj.sexo,
    };
    this._personasService.crearPersona(args).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.ok == 1) {
          window.location.reload();
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  }

  updateRowData(row_obj) {
    this.loading = true;
    let args = {
      _id: row_obj._id,
      nombre: row_obj.nombre,
      apellidos: row_obj.apellidos,
      edad: row_obj.edad,
      dni: row_obj.dni,
      cumple: row_obj.cumple,
      color: row_obj.color,
      sexo: row_obj.sexo,
    };
    this._personasService.editarPersona(args, row_obj._id).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.ok == 1) {
          window.location.reload();
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  }

  deleteRowData(row_obj) {
    this.loading = true;
    this._personasService.eliminarPersona(row_obj._id).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.ok == 1) {
          window.location.reload();
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  }
}
