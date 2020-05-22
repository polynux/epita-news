import { Component, OnInit } from '@angular/core';
import { NewsgroupService } from '../services/newsgroup.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups;
  constructor(
    private news: NewsgroupService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.news.getGroups().subscribe((data) => {
      this.groups = data;
    });
  }

  onGroup(group) {
    this.messagesService.changeMessages(group);
  }
}
