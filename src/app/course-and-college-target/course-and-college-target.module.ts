import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseAndCollegeTargetRoutingModule } from './course-and-college-target-routing.module';
import {CourseAndCollegeTargetComponent} from './course-and-college-target.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CourseAndCollegeTargetComponent],
  imports: [
    CommonModule,
    CourseAndCollegeTargetRoutingModule,
    SharedModule
  ]
})
export class CourseAndCollegeTargetModule { }
