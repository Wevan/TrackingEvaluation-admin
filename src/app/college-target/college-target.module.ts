import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeTargetRoutingModule } from './college-target-routing.module';
import {CollegeTargetComponent} from './college-target.component';
import {SharedModule} from '../shared/shared.module';
import {CollegeService} from '../college/college.service';
import {CollegeTargetService} from './college-target.service';

@NgModule({
  declarations: [CollegeTargetComponent],
  imports: [
    CommonModule,
    CollegeTargetRoutingModule,
    SharedModule
  ],
  providers: [CollegeTargetService]
})
export class CollegeTargetModule { }
