import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './user/user.module#UserModule' },
  {
    path: 'question',
    loadChildren: './test-question/test-question.module#TestQuestionModule',
  },
  { path: 'college', loadChildren: './college/college.module#CollegeModule' },
  {
    path: 'collegeTarget',
    loadChildren: './college-target/college-target.module#CollegeTargetModule',
  },
  {
    path: 'collegeTargetRelation',
    loadChildren:
      './college-target-relation/college-target-relation.module#CollegeTargetRelationModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
