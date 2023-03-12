import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, concat, Observable } from 'rxjs';
import { MonedasDto } from 'src/app/models/MonedasDto';
import { SucursalesDto } from 'src/app/models/SucursalesDto';
import { MonedaService } from 'src/app/services/monedas.service';
import { SucursalService } from 'src/app/services/sucursales.service';
import {finalize} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  form : FormGroup;
  listMonedas : MonedasDto[] = [];
  subscription: Subscription;
  listadoSucursales : SucursalesDto[] = [];
  result: any[] = [];
  constructor(private oIMonedaService: MonedaService, 
    private formBuilder: FormBuilder,
    private router:Router,
    private oIToast: ToastrService,
    private oISucursalService: SucursalService ) { }
 
     
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id : ['', Validators.required],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idMoneda: ['', Validators.required],
      direccion: ['', Validators.required],
      identificacion: ['', Validators.required]
    });
    this.getMonedas();
   
  }

  ;
  getMonedas(){
    this.oIMonedaService.getMoneda()
    .pipe(finalize( () => this.getSucursales()))
    .subscribe(response => {
      if(response.exito == true){
        this.listMonedas = response.data;
      }else{
        this.oIToast.error('Se ha presentado un error');
      }
    }, error => {
      this.oIToast.error("hubo un error, contacte al administrador");
    });
     
  }

  getSucursales(){
    this.oISucursalService.getSucursales() 
    .pipe(finalize( () => this.setConexionCSC()))
    .subscribe(response => {
      if(response.exito == true){
          this.listadoSucursales = response.data;
      }else{
        this.oIToast.error('Se ha presentado un error');
      }
    }, error => {
      this.oIToast.error("hubo un error, contacte al administrador");
    });
  }
 

  editarSucursal(sucursal: SucursalesDto){
    this.form.patchValue({
       codigo: sucursal.codigo,
       descripcion: sucursal.descripcion,
       direccion : sucursal.direccion,
       idMoneda : sucursal.idMoneda,
       identificacion : sucursal.identificacion,
       id : sucursal.id
    });
    (<HTMLInputElement>document.getElementById("tablaSucursal")!).style.display = "none";
    (<HTMLInputElement>document.getElementById("formSucursal")!).style.display = "block";
  }

  cancelar(){
    (<HTMLInputElement>document.getElementById("tablaSucursal")!).style.display = "block";
    (<HTMLInputElement>document.getElementById("formSucursal")!).style.display = "none";
  }

  deleteSucursal(sucursal: SucursalesDto){
          this.oISucursalService.deleteSucursales(sucursal.id).subscribe(
             rs =>{ 
              this.getSucursales();
              this.oIToast.success("se ha eliminado el registro correctamente");
             (<HTMLInputElement>document.getElementById("tablaSucursal")!).style.display = "block";
             (<HTMLInputElement>document.getElementById("formSucursal")!).style.display = "none";
            },
             err => this.oIToast.error("hubo un problema en el momento de borrar el registro")
          );
  }

    setConexionCSC(){
      this.result = [];
      for (const a of this.listMonedas) {
        for (const b of  this.listadoSucursales) {
          if (a.id === b.idMoneda) {
            this.result.push({
              id: b.id,
              codigo: b.codigo,
              descripcion: b.descripcion,
              direccion: b.direccion,
              fechaCreacion : b.fechaCreacion,
              identificacion : b.identificacion,
              idMoneda : b.idMoneda,
              moneda : a.codigo
            });
          }
        }
      }
  }


  updateSucursal(){
    const sucursal: SucursalesDto = {
      id            :this.form.get('id')?.value,
      codigo        :this.form.get('codigo')?.value,
      descripcion   :this.form.get('descripcion')?.value,
      direccion     :this.form.get('direccion')?.value,
      identificacion:this.form.get('identificacion')?.value,
      fechaCreacion : new Date(),
      idMoneda      :this.form.get('idMoneda')?.value
    }
    
    this.oISucursalService.updateSucursales(sucursal).subscribe(response => {
      if(response.exito == true){
        this.getSucursales();
        this.oIToast.success("Se actualizó correctamente");
        (<HTMLInputElement>document.getElementById("tablaSucursal")!).style.display = "block";
        (<HTMLInputElement>document.getElementById("formSucursal")!).style.display = "none";
        this.form.reset();
      }else{
        this.oIToast.error("hubo un error en la actualización");
         this.form.reset()
      }
  },error => {
        this.oIToast.error("Por favor contacte al administrador!");
  });     

}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  
 }

}
