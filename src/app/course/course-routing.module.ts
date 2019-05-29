import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseComponent} from './course.component';
import {CourseService} from './course.service';

const routes: Routes = [
  {path: '', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseService]
})
export class CourseRoutingModule { }
