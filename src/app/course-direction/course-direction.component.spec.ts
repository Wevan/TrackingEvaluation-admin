import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDirectionComponent } from './course-direction.component';

describe('CourseDirectionComponent', () => {
  let component: CourseDirectionComponent;
  let fixture: ComponentFixture<CourseDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
