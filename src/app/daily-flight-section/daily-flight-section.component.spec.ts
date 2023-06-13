import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyFlightSectionComponent } from './daily-flight-section.component';

describe('DailyFlightSectionComponent', () => {
  let component: DailyFlightSectionComponent;
  let fixture: ComponentFixture<DailyFlightSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyFlightSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyFlightSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
