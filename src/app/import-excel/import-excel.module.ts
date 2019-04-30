import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ImportExcelComponent} from './import-excel.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [ImportExcelComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroAntdModule
  ]
})
export class ImportExcelModule { }
