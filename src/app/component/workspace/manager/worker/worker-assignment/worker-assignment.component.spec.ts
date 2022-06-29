import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerAssignmentComponent } from './worker-assignment.component';

describe('WorkerAssignmentComponent', () => {
  let component: WorkerAssignmentComponent;
  let fixture: ComponentFixture<WorkerAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
