import { Component, OnInit } from '@angular/core';
import { NewsgroupService } from '../services/newsgroup.service';
import { Subscription } from 'rxjs';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messages = [];
  messagesSubscription: Subscription;

  constructor(
    private news: NewsgroupService,
    private messagesService: MessagesService
  ) {}

  alert(text) {
    window.alert(text);
  }

  ngOnInit() {
    this.messagesSubscription = this.messagesService.messagesSubject.subscribe(
      (messages) => {
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].article === undefined) {
            messages.slice(i, 1);
          }
        }
        this.messages = messages;
      }
    );
  }
}
