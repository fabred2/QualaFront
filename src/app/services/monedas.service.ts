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
export class MonedaService {

  httpOptions = {
    headers:{
      'Content-Type' : 'application/json'
    }
  };
  constructor(private http: HttpClient) { }
  url:string = 'https://localhost:44348/api/Moneda/';
  getMoneda(): Observable<ResponseDto> {
    var tome = this.http.get<ResponseDto>(this.url + 'GetAll',this.httpOptions);
    return tome;
  } 
}
