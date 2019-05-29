import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseAndCollegeTargetService} from './course-and-college-target.service';
import {CourseComponent} from '../course/course.component';
import {CourseAndCollegeTargetComponent} from './course-and-college-target.component';

const routes: Routes = [
  {path: '', component: CourseAndCollegeTargetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseAndCollegeTargetService]
})
export class CourseAndCollegeTargetRoutingModule { }
