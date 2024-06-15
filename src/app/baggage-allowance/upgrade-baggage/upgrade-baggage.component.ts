import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-upgrade-baggage",
  templateUrl: "./upgrade-baggage.component.html",
  styleUrls: ["./upgrade-baggage.component.scss"],
})
export class UpgradeBaggageComponent {
  @Output() onUpgradeBaggageOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onQuantityChange: EventEmitter<object> = new EventEmitter<object>();

  @Input() isUpgradeBaggageOpen = false;

  includedCarryOnItem = 1;
  @Input() numberOfPersonalItem = 1;

  // changes
  @Input() numberOfCarryOnItem = 1;
  @Input() numberOfCheckedInBaggage = 1;

  confirmUpgrade() {
    this.isUpgradeBaggageOpen = !this.isUpgradeBaggageOpen;
    this.onQuantityChange.emit({
      checkedIn: this.numberOfCheckedInBaggage,
      carryOn: this.numberOfCarryOnItem,
    });
    this.onUpgradeBaggageOpenChange.emit(this.isUpgradeBaggageOpen);
  }

  exitUpgrade() {
    this.isUpgradeBaggageOpen = !this.isUpgradeBaggageOpen;
    this.onUpgradeBaggageOpenChange.emit(this.isUpgradeBaggageOpen);
  }

  getCarryOnBaggage() {
    if (this.numberOfCarryOnItem - this.includedCarryOnItem <= 0) {
      return 0;
    }
    return this.numberOfCarryOnItem - this.includedCarryOnItem;
  }

  onCheckedInBaggageChange(value: any) {
    console.log(value.value);
    this.numberOfCheckedInBaggage = value.value;
  }
  onCarryOnItemChange(value: any) {
    console.log(value.value);
    if (value.value > 0) {
      this.numberOfCarryOnItem = value.value + this.includedCarryOnItem;
    }
  }
}