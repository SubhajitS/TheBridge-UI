import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BridgeComponent } from './bridge/bridge.component';


const routes: Routes = [
  { path: 'bridge', component: BridgeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'bridge' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
