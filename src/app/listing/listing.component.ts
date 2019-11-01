import { Component, OnInit } from '@angular/core';
import {ExecutionsService} from '../executions.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.sass']
})
export class ListingComponent implements OnInit {

  constructor(public execService: ExecutionsService) { }


  getObj(obj) {
    return Object.keys(obj);
  }

  ngOnInit() {

  }

}
