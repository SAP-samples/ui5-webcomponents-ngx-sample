import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsUpgradeComponent } from './seats-upgrade.component';

describe('SeatsUpgradeComponent', () => {
  let component: SeatsUpgradeComponent;
  let fixture: ComponentFixture<SeatsUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsUpgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatsUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
