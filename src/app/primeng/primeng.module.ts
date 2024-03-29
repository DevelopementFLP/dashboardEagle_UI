import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card'
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ChartModule
  ],
  exports:[ 
    CardModule,
    ChartModule
  ]
})
export class PrimengModule { }
