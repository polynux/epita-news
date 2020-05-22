import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { NewsgroupService } from './services/newsgroup.service';
import { MessagesService } from './services/messages.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupListComponent } from './group-list/group-list.component';
import { MessageListComponent } from './message-list/message-list.component';

@NgModule({
  declarations: [AppComponent, GroupListComponent, MessageListComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule],
  providers: [NewsgroupService, MessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
