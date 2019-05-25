import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseTargetRoutingModule} from './course-target-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CourseTargetComponent} from './course-target.component';
import {CourseTargetService} from './course-target.service';

@NgModule({
  declarations: [CourseTargetComponent],
  imports: [
    CommonModule,
    CourseTargetRoutingModule,
    SharedModule
  ],
  providers: [CourseTargetService]
})
export class CourseTargetModule {
}
