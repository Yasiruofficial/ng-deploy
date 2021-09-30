import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelRoutingModule } from './excel-routing.module';
import { ExcelComponent } from './excel.component';


@NgModule({
  declarations: [
    ExcelComponent
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule
  ]
})
export class ExcelModule { }
