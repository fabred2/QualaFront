import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/sucursal/index/index.component';
import { InsertComponent } from './components/sucursal/insert/insert.component';


const routes: Routes = [
  { path:'sucursal/index', component: IndexComponent  }, 
  { path:'sucursal/insert', component: InsertComponent  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
