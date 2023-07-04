import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UpgradeBaggageComponent } from "./upgrade-baggage.component";

describe("UpgradeBaggageComponent", () => {
  let component: UpgradeBaggageComponent;
  let fixture: ComponentFixture<UpgradeBaggageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpgradeBaggageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpgradeBaggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
