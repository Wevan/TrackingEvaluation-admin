import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeTargetRelationComponent } from './college-target-relation.component';

describe('CollegeTargetRelationComponent', () => {
  let component: CollegeTargetRelationComponent;
  let fixture: ComponentFixture<CollegeTargetRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeTargetRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeTargetRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
