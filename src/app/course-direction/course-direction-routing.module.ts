import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CourseDirectionComponent} from './course-direction.component';

const routes: Routes = [
  {path: '', component: CourseDirectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseDirectionRoutingModule {
}
