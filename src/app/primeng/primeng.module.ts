import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card'
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ChartModule
  ],
  exports:[ 
    CardModule,
    ChartModule,
    TooltipModule
  ]
})
export class PrimengModule { }
