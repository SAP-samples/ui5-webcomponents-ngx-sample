import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggageAllowanceComponent } from './baggage-allowance.component';

describe('BaggageAllowanceComponent', () => {
  let component: BaggageAllowanceComponent;
  let fixture: ComponentFixture<BaggageAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaggageAllowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggageAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
