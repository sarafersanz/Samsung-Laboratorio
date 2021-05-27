import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  constructor(private http: HttpClient) {}

  listadoPersonas() {
    console.log(`${environment.urlApi}/users`);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${environment.urlApi}/users`, { headers });
  }

  detallePersona(id){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(`${environment.urlApi}/users/${id}`, { headers });
  }

  crearPersona(args){
    console.log(args);
    let json = JSON.stringify(args);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${environment.urlApi}/users`, json, { headers });
  }

  editarPersona(args, id){

    let json = JSON.stringify(args);
    console.log(id + " --> " +json);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${environment.urlApi}/users/${id}`, json, { headers });
  }

  eliminarPersona(id){
    console.log(id);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(`${environment.urlApi}/users/${id}`, { headers });
  }

}
