import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlannerComponent } from './trip-planner.component';

describe('TripPlannerComponent', () => {
  let component: TripPlannerComponent;
  let fixture: ComponentFixture<TripPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
