import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.sass']
})
export class ItemdetailsComponent implements OnInit {
  @Input() call;
  attempt = 0;
  constructor() { }
  changedPage($event) {
    this.attempt = $event.pageIndex;
  }
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
