import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ExecutionsService} from '../executions.service';

@Component({
  selector: 'app-stepdetails',
  templateUrl: './stepdetails.component.html',
  styleUrls: ['./stepdetails.component.sass']
})
export class StepdetailsComponent implements OnInit, OnChanges {

  @Input() steps;
  @Input() attempt;

  selected = 0;

  displayChains(call) {
    const chains = [];
    call.chainList.forEach((chain) => {
      let start = '';
      chain.forEach((parts) => {
        start += ((start) ? '.' : '') + parts;
      });
      chains.push(start);
    });
    return chains;
  }

  reduce(call) {
    const out = [];
    const chains = this.displayChains(call);
    let onChain = 0;
    let resume = 0;
    for (const step of call.steps) {
      let totalTime = 0;
      if (out[onChain]) {
        totalTime = out[onChain].time;
      }
      out[onChain] = {chainPart: step, time: (totalTime + step.total), chain: chains[onChain].substring(step.step.length)};
      resume = onChain + 1;
      if (chains[onChain] === step.step) {
        onChain++;
      }

    }
    for (let x = resume; x < chains.length; x++) {
      out[x] = {chainPart: undefined, chain: chains[x]};
    }
    return out;
  }

  json(obj) {
    return JSON.stringify(obj);
  }

  select(idx) {
    this.selected = idx;
  }

  constructor(public execService: ExecutionsService) {
  }

  ngOnInit() {
    this.selected = 0;
  }

  ngOnChanges(changes): void {
    this.selected = 0;
  }

}
