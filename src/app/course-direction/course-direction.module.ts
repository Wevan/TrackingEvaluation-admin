import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseDirectionRoutingModule} from './course-direction-routing.module';
import {CourseDirectionComponent} from './course-direction.component';
import {CourseDirectionService} from './course-direction.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CourseDirectionComponent],
  imports: [
    CommonModule,
    CourseDirectionRoutingModule,
    SharedModule
  ],
  providers: [CourseDirectionService]
})
export class CourseDirectionModule {
}
