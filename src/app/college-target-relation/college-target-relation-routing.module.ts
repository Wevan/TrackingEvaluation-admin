import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollegeTargetRelationComponent} from './college-target-relation.component';

const routes: Routes = [
  {path: '', component: CollegeTargetRelationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeTargetRelationRoutingModule { }
