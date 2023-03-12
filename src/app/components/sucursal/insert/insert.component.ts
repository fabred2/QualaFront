import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MonedasDto } from 'src/app/models/MonedasDto';
import { SucursalesDto } from 'src/app/models/SucursalesDto';
import { MonedaService } from 'src/app/services/monedas.service';
import { SucursalService } from 'src/app/services/sucursales.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
    form : FormGroup;
    listMonedas : MonedasDto[] = [];
    constructor(
    private router:Router, 
    private oIToast: ToastrService  ,
    private formBuilder: FormBuilder,
    private oISucursalService: SucursalService, 
    private oIMonedaService: MonedaService
    ) { }

  ngOnInit(): void {
       this.getMonedas();
       this.form = this.formBuilder.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        idMoneda: ['', Validators.required],
        direccion: ['', Validators.required],
        identificacion: ['', Validators.required]
      });
  }

  getMonedas(){
    this.oIMonedaService.getMoneda().subscribe(response => {
      if(response.exito == true){
        this.listMonedas = response.data;
      }else{
        alert(response.mensaje);
      }
    }, error => {
      alert("hubo un error, contacte al administrador");
    });
     
  }

  setSucursal(){
        const sucursal: SucursalesDto = {
          id            :this.form.get('id')?.value,
          codigo        :this.form.get('codigo')?.value,
          descripcion   :this.form.get('descripcion')?.value,
          direccion     :this.form.get('direccion')?.value,
          identificacion:this.form.get('identificacion')?.value,
          fechaCreacion : new Date(),
          idMoneda      :this.form.get('idMoneda')?.value
        }
        
        this.oISucursalService.addSucursales(sucursal).subscribe(response => {
          if(response.exito == true){
            this.oIToast.success('Se ha realizado la Actualización correctamente');
             this.form.reset();
          }else{
             this.oIToast.error("hubo un error en la inserción");
             this.form.reset()
          }
      },error => {
             this.oIToast.error("Por favor contactar al administrador");
      });     

  }

}
