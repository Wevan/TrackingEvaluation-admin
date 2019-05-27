import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestQuestionRoutingModule } from './test-question-routing.module';
import { QuestionComponent } from './question/question.component';
import { SharedModule } from '../shared/shared.module';
import { AlgorithmQuestionComponent } from './algorithm-question/algorithm-question.component';

@NgModule({
  declarations: [QuestionComponent, AlgorithmQuestionComponent],
  imports: [CommonModule, TestQuestionRoutingModule, SharedModule],
})
export class TestQuestionModule {}
