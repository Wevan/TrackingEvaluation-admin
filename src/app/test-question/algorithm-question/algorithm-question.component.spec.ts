import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmQuestionComponent } from './algorithm-question.component';

describe('AlgorithmQuestionComponent', () => {
  let component: AlgorithmQuestionComponent;
  let fixture: ComponentFixture<AlgorithmQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
