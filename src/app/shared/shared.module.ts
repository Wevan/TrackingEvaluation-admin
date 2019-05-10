import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TableComponent } from './table/table.component';
import { httpInterceptorProviders } from '../http-interceptors';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule],
  exports: [
    NgZorroAntdModule,
    CommonModule,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
})
export class SharedModule {}
