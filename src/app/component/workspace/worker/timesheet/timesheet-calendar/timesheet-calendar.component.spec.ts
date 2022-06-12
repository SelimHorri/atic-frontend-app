import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetCalendarComponent } from './timesheet-calendar.component';

describe('TimesheetCalendarComponent', () => {
  let component: TimesheetCalendarComponent;
  let fixture: ComponentFixture<TimesheetCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
