import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequency'
})
export class FrequencyPipe implements PipeTransform {

  transform(frequency: number, ...args: unknown[]): unknown {
    
    let res = "";

    switch (frequency) {
        case 0:
          res = "Daily";
        break;
        
        case 1:
          res = "Weekly";
        break;
        
        case 2:
          res = "Monthly";
        break;
        
        case 3:
          res = "Quarterly";
        break;
        
        case 4:
          res = "Half Yearly";
        break;

        case 5:
          res = "Yearly";
        break;
         
    
      default:
        break;
    }
    

    return res;
  }

}
