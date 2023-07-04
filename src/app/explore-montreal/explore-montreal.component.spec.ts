import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExploreMontrealComponent } from "./explore-montreal.component";

describe("ExploreMontrealComponent", () => {
  let component: ExploreMontrealComponent;
  let fixture: ComponentFixture<ExploreMontrealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreMontrealComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreMontrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
