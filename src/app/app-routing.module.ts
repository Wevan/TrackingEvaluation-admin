import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: './user/user.module#UserModule'},
  {
    path: 'question',
    loadChildren: './test-question/test-question.module#TestQuestionModule',
  },
  {path: 'college', loadChildren: './college/college.module#CollegeModule'},

  {
    path: 'collegeTarget',
    loadChildren: './college-target/college-target.module#CollegeTargetModule',
  },
  {
    path: 'collegeTargetRelation',
    loadChildren:
      './college-target-relation/college-target-relation.module#CollegeTargetRelationModule',
  },
  {
    path: 'direction',
    loadChildren: './direction/direction.module#DirectionModule',
  },
  {
    path: 'class',
    loadChildren: './class-manager/class-manager.module#ClassManagerModule',
  },

  {
    path: 'courseDirection',
    loadChildren:
      './course-direction/course-direction.module#CourseDirectionModule',
  },
  {path: 'course', loadChildren: './course/course.module#CourseModule'},

  {path: 'courseTarget', loadChildren: './course-target/course-target.module#CourseTargetModule'},
  {path: 'knowledge', loadChildren: './knowledge/knowledge.module#KnowledgeModule'},
  {path: 'ways', loadChildren: './ways/ways.module#WaysModule'},
  {
    path: 'courseAndCollegeTarget',
    loadChildren: './course-and-college-target/course-and-college-target.module#CourseAndCollegeTargetModule'
  },
  {
    path: 'courseTarAndKnowledge',
    loadChildren: './course-tar-and-knowledge/course-tar-and-knowledge.module#CourseTarAndKnowledgeModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
