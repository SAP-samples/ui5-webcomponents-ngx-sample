import{animate,style,transition,trigger,state} from '@angular/animations';


export const slideIn =
  trigger('slideIn', [

    state('*', style({
  
    })),
    transition(':enter', [
      style({
        transform: 'translateY(-10%)',
        opacity: 0
      }),
      animate('.5s ease-in-out', style({
        transform: 'translateY(0)',
        opacity: 1
      }))
    ]),
    transition(':leave', [
      animate('.5s ease-in-out', style({
        transform: 'translateY(-10%)',
        opacity: 0
      }))
    ])
    ]);