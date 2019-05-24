import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionComponent } from './direction.component';

describe('DirectionComponent', () => {
  let component: DirectionComponent;
  let fixture: ComponentFixture<DirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
