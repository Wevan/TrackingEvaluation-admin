import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseTarAndKnowledgeComponent} from './course-tar-and-knowledge.component';
import {CourseAndCollegeTargetService} from '../course-and-college-target/course-and-college-target.service';
import {CourseTarAndKnowledgeService} from './course-tar-and-knowledge.service';

const routes: Routes = [
  {path: '', component: CourseTarAndKnowledgeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseTarAndKnowledgeService]
})
export class CourseTarAndKnowledgeRoutingModule { }
