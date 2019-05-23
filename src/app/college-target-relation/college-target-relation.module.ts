import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollegeTargetRelationRoutingModule} from './college-target-relation-routing.module';
import {CollegeTargetRelationComponent} from './college-target-relation.component';
import {CollegeTargetRelationService} from './college-target-relation.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CollegeTargetRelationComponent],
  imports: [
    CommonModule,
    CollegeTargetRelationRoutingModule,
    SharedModule
  ],
  providers: [CollegeTargetRelationService]
})
export class CollegeTargetRelationModule {
}
