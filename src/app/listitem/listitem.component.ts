import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.sass']
})
export class ListitemComponent implements OnInit {
  @Input() call;
  showMore = false;
  constructor() { }
  displayChains(call) {
    const chains = [];
    const chainToLongestTime = {};
    call.steps.forEach((step) => {
      if (!chainToLongestTime[step.step] || (chainToLongestTime[step.step] && chainToLongestTime[step.step] < step.total)) {
        chainToLongestTime[step.step] = step.total;
      }
    });
    call.chainList.forEach((chain) => {
      let start = '';
      chain.forEach((parts) => {
        start += ((start) ? '.' : '' ) + parts;
      });
      if (chainToLongestTime[start] !== undefined) {
        chains.push(start + ' ( ' + chainToLongestTime[start] + ' ms )');
      } else {
        chains.push(start);
      }
    });
    return chains;
  }


  ngOnInit() {
  }

}
