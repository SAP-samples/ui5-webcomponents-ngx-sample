import { Component, Input } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-legend-item",
  templateUrl: "./legend-item.component.html",
  styleUrls: ["./legend-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendItemComponent {
  constructor() {}

  ngOnInit() {}

  @Input() icon: string = "";
  @Input() color: string = "";
  @Input() text: string = "";
}
