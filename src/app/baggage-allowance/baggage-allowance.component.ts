import { Component } from "@angular/core";

@Component({
  selector: "app-baggage-allowance",
  templateUrl: "./baggage-allowance.component.html",
  styleUrls: ["./baggage-allowance.component.scss"],
})
export class BaggageAllowanceComponent {
  isBaggageUpgradeOpen = false;
  numberOfPersonalItems = 1;
  numberOfCarryOnItems = 1;
  numberOfCheckdItems = 1;

  onUpgradeClick() {
    this.isBaggageUpgradeOpen = !this.isBaggageUpgradeOpen;
  }

  onQuantityChange(event: any) {
    this.numberOfCarryOnItems = event.carryOn;
    this.numberOfCheckdItems = event.checkedIn;
  }

  onUpgradeBaggageOpenChange(event: boolean) {
    this.isBaggageUpgradeOpen = event;
    this.numberOfCarryOnItems = this.numberOfCarryOnItems;
    this.numberOfCheckdItems = this.numberOfCheckdItems;
  }
}