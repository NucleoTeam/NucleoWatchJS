import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-stepdetails',
  templateUrl: './stepdetails.component.html',
  styleUrls: ['./stepdetails.component.sass']
})
export class StepdetailsComponent implements OnInit, OnChanges {

  @Input() steps;
  @Input() attempt;

  selected = 0;

  json(obj) {
    return JSON.stringify(obj);
  }

  select(idx) {
    this.selected = idx;
  }

  constructor() { }

  ngOnInit() {
    this.selected = 0;
  }
  ngOnChanges(changes): void {
    this.selected = 0;
  }

}
