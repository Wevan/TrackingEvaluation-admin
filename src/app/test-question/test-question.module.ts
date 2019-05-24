import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestQuestionRoutingModule } from './test-question-routing.module';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    TestQuestionRoutingModule
  ]
})
export class TestQuestionModule { }
