import { Component, OnInit } from '@angular/core';
import {ExecutionsService} from '../executions.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(public execService: ExecutionsService) { }

  retries = [0, 1, 2, 3, 4, 5];
  statuses = {
    complete : 'fas fa-link',
    incomplete: 'fas fa-unlink',
    timeout: 'far fa-clock',
    break: 'fas fa-hand-paper'
  };
  slideVal = 0;


  formatLabel(value: number) {
      return '>' + value + 'ms';
  }
  statusKeys() {
    return Object.keys(this.statuses);
  }
  changed(event) {
    if (this.slideVal) {
      this.execService.filter('time', this.slideVal);
    } else {
      delete this.execService.filters.time;
    }
  }
  ngOnInit() {
  }

}
