import { Component, OnInit } from '@angular/core';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import {ExecutionsService} from '../executions.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {


  constructor(private rxStompService: RxStompService, private execService: ExecutionsService) { }

  ngOnInit() {
    this.rxStompService.watch('/topic/complete').subscribe((message: Message) => {
      const data = JSON.parse(message.body).objects.root;
      if (data.chainBreak.breakChain) {
        data.status = 'break';
      } else {
        data.status = 'complete';
      }
      this.execService.store(data);
    });
    this.rxStompService.watch('/topic/incomplete').subscribe((message: Message) => {
      const data = JSON.parse(message.body).objects.root;
      data.status = 'incomplete';
      this.execService.store(data);
    });
    this.rxStompService.watch('/topic/timeout').subscribe((message: Message) => {
      const data = JSON.parse(message.body).objects.root;
      data.status = 'timeout';
      this.execService.store(data);
    });
  }

}
