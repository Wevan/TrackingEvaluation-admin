import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollegeRoutingModule} from './college-routing.module';
import {CollegeComponent} from './college.component';
import {SharedModule} from '../shared/shared.module';
import {CollegeService} from './college.service';

@NgModule({
  declarations: [CollegeComponent],
  imports: [
    CommonModule,
    CollegeRoutingModule,
    SharedModule
  ],
  providers: [CollegeService]
})
export class CollegeModule {
}
