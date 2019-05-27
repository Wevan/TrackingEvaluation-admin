import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTargetComponent } from './course-target.component';

describe('CourseTargetComponent', () => {
  let component: CourseTargetComponent;
  let fixture: ComponentFixture<CourseTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
