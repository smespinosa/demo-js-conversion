import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'printshop',
    loadChildren: () =>
      import('./modules/print-shop/print-shop.module').then(
        (m) => m.PrintShopModule
      ),
  },
];
@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
