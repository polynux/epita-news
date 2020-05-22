import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsgroupService {
  constructor(private httpClient: HttpClient) {}

  getGroups() {
    return this.httpClient.get('http://localhost:8000/groups');
  }

  getMessagesFromGroup(group: string) {
    return this.httpClient.get('http://localhost:8000/groups/' + group);
  }
}
