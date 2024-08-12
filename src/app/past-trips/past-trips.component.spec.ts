import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTripsComponent } from './past-trips.component';

describe('PastTripsComponent', () => {
  let component: PastTripsComponent;
  let fixture: ComponentFixture<PastTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastTripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
