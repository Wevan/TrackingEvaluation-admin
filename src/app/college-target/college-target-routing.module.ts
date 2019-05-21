import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CollegeTargetComponent} from './college-target.component';

const routes: Routes = [
  {path: '', component: CollegeTargetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeTargetRoutingModule {
}
