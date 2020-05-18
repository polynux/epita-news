import { Component } from '@angular/core';
import { NewsgroupService } from './services/newsgroup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'epita-news';
  groups = [];

  constructor(private newsgroupService: NewsgroupService) {
    newsgroupService.getGroups().subscribe((res) => {
      this.groups.push(res);
    });
  }
}
