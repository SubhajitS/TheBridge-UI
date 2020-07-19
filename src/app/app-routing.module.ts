import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BridgeComponent } from './bridge/bridge.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [{ path: 'bridge', component: BridgeComponent, canActivate: [MsalGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
