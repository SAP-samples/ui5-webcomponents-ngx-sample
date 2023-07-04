import {
  animate,
  style,
  transition,
  trigger,
  group,
} from "@angular/animations";

export const fadeIn = trigger("fadeIn", [
  transition(":enter", [
    style({
      opacity: 0,
    }),
    animate("1s ease-in", style({ opacity: 1 })),
  ]),
]);

export const fadeOut = trigger("fadeOut", [
  transition(":leave", [
    style({
      opacity: 1,
    }),
    animate("100ms ease-out", style({ opacity: 0 })),
  ]),
]);

export const slideOut = trigger("slideOut", [
  transition(":leave", [
    group([
      animate(
        "400ms ease-in-out",
        style({
          opacity: "0",
        })
      ),
      animate(
        "400ms ease-in-out",
        style({
          height: "0px",
        })
      ),
      animate(
        "500ms ease-in-out",
        style({
          display: "none",
        })
      ),
    ]),
  ]),
]);
