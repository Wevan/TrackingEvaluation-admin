import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeTargetComponent } from './college-target.component';

describe('CollegeTargetComponent', () => {
  let component: CollegeTargetComponent;
  let fixture: ComponentFixture<CollegeTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
