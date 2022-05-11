import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedWorkerComponent } from './assigned-worker.component';

describe('AssignedWorkerComponent', () => {
  let component: AssignedWorkerComponent;
  let fixture: ComponentFixture<AssignedWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
