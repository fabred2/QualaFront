import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { ResponseDto } from '../models/ResponseDto';
import { MonedasDto } from '../models/MonedasDto';
import { SucursalesDto } from '../models/SucursalesDto';


@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  httpOptions = {
    headers:{
      'Content-Type' : 'application/json'
    }
  };
  constructor(private http: HttpClient) { }
  url:string = 'https://localhost:44348/api/Sucursal/';
  getSucursales(): Observable<ResponseDto> {
    var tome = this.http.get<ResponseDto>(this.url + 'GetAll',this.httpOptions);
    return tome;
  }

  addSucursales(item:SucursalesDto):Observable<ResponseDto>{
      return this.http.post<ResponseDto>(this.url + 'Insert', item, this.httpOptions);
  }

  updateSucursales(item : SucursalesDto) :Observable<ResponseDto>{
    return this.http.put<ResponseDto>(this.url + 'Update', item, this.httpOptions);
  }

  deleteSucursales(id:number): Observable<any>{
      return this.http.delete<any>(this.url + id,  this.httpOptions);
  }


}
