import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTarAndKnowledgeComponent } from './course-tar-and-knowledge.component';

describe('CourseTarAndKnowledgeComponent', () => {
  let component: CourseTarAndKnowledgeComponent;
  let fixture: ComponentFixture<CourseTarAndKnowledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTarAndKnowledgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTarAndKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
