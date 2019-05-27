import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseRoutingModule} from './course-routing.module';
import {CourseComponent} from './course.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ]
})
export class CourseModule {
}
