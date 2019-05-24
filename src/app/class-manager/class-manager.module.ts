import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassManagerRoutingModule } from './class-manager-routing.module';
import { ClassManagerComponent } from './class-manager.component';
import { SharedModule } from '../shared/shared.module';
import { ClassManagerService } from './class-manager.service';

@NgModule({
  declarations: [ClassManagerComponent],
  imports: [CommonModule, ClassManagerRoutingModule, SharedModule],
  providers: [ClassManagerService],
})
export class ClassManagerModule {}
