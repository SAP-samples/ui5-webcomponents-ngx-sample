import { Component, Input } from "@angular/core";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
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

  constructor() {}

  ngOnInit() {}

  closeMessage() {
    this.isMessageRemoved = !this.isMessageRemoved;
  }
  onMessageClick() {
    if (this.clickedMessage === false) {
      this.clickedMessage = !this.clickedMessage;
      this.messageDesign = "Positive";
    }
  }
}
