import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAndCollegeTargetComponent } from './course-and-college-target.component';

describe('CourseAndCollegeTargetComponent', () => {
  let component: CourseAndCollegeTargetComponent;
  let fixture: ComponentFixture<CourseAndCollegeTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAndCollegeTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAndCollegeTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
