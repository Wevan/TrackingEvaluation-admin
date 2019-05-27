import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { KnowledgeComponent } from './knowledge.component';
import {CourseTargetService} from '../course-target/course-target.service';
import {KnowledgeService} from './knowledge.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [KnowledgeComponent],
  imports: [
    CommonModule,
    KnowledgeRoutingModule,
    SharedModule
  ],
  providers: [KnowledgeService]
})
export class KnowledgeModule { }
