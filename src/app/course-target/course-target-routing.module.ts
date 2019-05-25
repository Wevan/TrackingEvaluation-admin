import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseTargetComponent} from './course-target.component';

const routes: Routes = [
  {path: '', component: CourseTargetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseTargetRoutingModule {
}
