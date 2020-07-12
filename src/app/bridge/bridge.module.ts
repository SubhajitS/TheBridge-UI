import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealHandService } from './deal-hand.service';
import { BridgeComponent } from './bridge.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [BridgeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [DealHandService]
})
export class BridgeModule { }
