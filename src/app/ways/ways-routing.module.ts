import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WaysComponent} from './ways.component';

const routes: Routes = [
  {path: '', component: WaysComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaysRoutingModule {
}
