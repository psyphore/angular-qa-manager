import { Pipe, PipeTransform } from '@angular/core';
// import { } from '@fortawesome/angular-fontawesome';
// import * as faf from '@fortawesome/fontawesome-free';
// import * as fabf from '@fortawesome/free-brands-svg-icons';
// import * as fasf from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'statusIcon'
})

export class StatusIconTranslatorPipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    let res: any;
    switch (value) {
      case '':
        res = 'fa fa';
        break;

      default:
        break;
    }
    return res;
  }
}
