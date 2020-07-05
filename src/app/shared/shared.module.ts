import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [CardComponent]
})
export class SharedModule { }
