import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CollegeComponent} from './college.component';

const routes: Routes = [
  {path: '', component: CollegeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeRoutingModule {
}
