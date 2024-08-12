import { Component, Input } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  constructor() {}

  ngOnInit() {}

  @Input() gate: string = "";
}
