import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionRoutingModule } from './direction-routing.module';
import { DirectionComponent } from './direction.component';
import {DirectionService} from './direction.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [DirectionComponent],
  imports: [
    CommonModule,
    DirectionRoutingModule,
    SharedModule
  ],
  providers: [DirectionService]
})
export class DirectionModule { }
