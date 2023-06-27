import{animate,style,transition,trigger,state} from '@angular/animations';


export const slideIn =
  trigger('slideIn', [
    state('*',
      style({
        opacity: 1,
        transform: 'perspective(500px) translateZ(0px)',
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'perspective(500px) translateZ(-400px)',
      }),
      animate('10s ease')
    ]),
    transition(':leave', [
      animate('10s ease', style({
        opacity: 0,
        transform: 'perspective(500px) translateZ(-400px)',
      }))
    ])
  ]);