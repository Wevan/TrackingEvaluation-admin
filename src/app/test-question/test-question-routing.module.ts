import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { AlgorithmQuestionComponent } from './algorithm-question/algorithm-question.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
  },
  {
    path: 'algotithm',
    component: AlgorithmQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestQuestionRoutingModule {}
