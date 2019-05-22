import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './user/user.module#UserModule' },
  { path: 'college', loadChildren: './college/college.module#CollegeModule' },
  { path: 'collegeTarget', loadChildren: './college/college.module#CollegeModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
