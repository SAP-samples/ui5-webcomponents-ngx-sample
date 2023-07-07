import { Component, EventEmitter, Input, Output } from "@angular/core";
import { fadeOut, fadeIn, slideOut } from "./animations";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
  animations: [fadeIn, fadeOut, slideOut],
})
export class MessageComponent {
  @Input() gate: string = "";
  isMessageRemoved = false;

  //message
  clickedMessage: boolean = false;
  messageDesign:
    | "Information"
    | "Negative"
    | "Positive"
    | "Warning"
    | undefined = "Information";

  @Output() onCheckInModeActive: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  closeMessage() {
    this.isMessageRemoved = !this.isMessageRemoved;
  }
  onMessageClick() {
    this.onCheckInModeActive.emit(true);
    if (this.clickedMessage === false) {
      this.clickedMessage = !this.clickedMessage;
      setTimeout(() => {
        this.messageDesign = "Positive";
      }, 200);
    }
  }
}
