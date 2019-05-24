import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassManagerComponent } from './class-manager.component';

describe('ClassManagerComponent', () => {
  let component: ClassManagerComponent;
  let fixture: ComponentFixture<ClassManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
