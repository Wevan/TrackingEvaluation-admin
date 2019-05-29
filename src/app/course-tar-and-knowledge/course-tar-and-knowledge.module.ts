import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseTarAndKnowledgeRoutingModule} from './course-tar-and-knowledge-routing.module';
import {CourseTarAndKnowledgeComponent} from './course-tar-and-knowledge.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [CourseTarAndKnowledgeComponent],
  imports: [
    CommonModule,
    CourseTarAndKnowledgeRoutingModule,
    SharedModule
  ]
})
export class CourseTarAndKnowledgeModule {
}
