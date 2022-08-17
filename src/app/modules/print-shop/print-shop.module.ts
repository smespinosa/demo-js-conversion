import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PrintShopComponent } from './pages/print-shop/print-shop.component';

const routes: Routes = [
  {
    path: '',
    component: PrintShopComponent,
  },
];
@NgModule({
  declarations: [PrintShopComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintShopModule {}
