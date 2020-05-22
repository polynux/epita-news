import { Injectable } from '@angular/core';
import { NewsgroupService } from './newsgroup.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private news: NewsgroupService) {}

  messagesSubject = new Subject<any[]>();
  private messages;

  emitMessagesSubject() {
    this.messagesSubject.next(this.messages);
  }

  changeMessages(group) {
    this.news.getMessagesFromGroup(group).subscribe((messagesHere) => {
      let temp = [];
      for (let i = 0; i < Object.keys(messagesHere).length; i++) {
        if (Object.keys(messagesHere[i]).length === 0) {
          continue;
        }
        temp.push(messagesHere[i]);
      }
      this.messages = temp;
      this.emitMessagesSubject();
    });
  }
}
