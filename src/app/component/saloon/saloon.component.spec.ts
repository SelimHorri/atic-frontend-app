import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonComponent } from './saloon.component';

describe('SaloonComponent', () => {
  let component: SaloonComponent;
  let fixture: ComponentFixture<SaloonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaloonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
