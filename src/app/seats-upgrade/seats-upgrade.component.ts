import { Component, Input, Output, EventEmitter } from "@angular/core";
import { fadeOut, fadeIn } from "./animations";
@Component({
  selector: "app-seats-upgrade",
  templateUrl: "./seats-upgrade.component.html",
  styleUrls: ["./seats-upgrade.component.scss"],
  animations: [fadeIn, fadeOut],
})
export class SeatsUpgradeComponent {
  @Input() openUpgradeWindow: boolean = false;
  @Output() openUpgradeWindowChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  exitUpgrade() {
    this.openUpgradeWindow = !this.openUpgradeWindow;
    this.openUpgradeWindowChange.emit(this.openUpgradeWindow);
  }
}
