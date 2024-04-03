import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatLogPage } from './chat-log.page';
import { ChatLogPageRoutingModule } from './chat-log-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatLogPageRoutingModule
  ],
  declarations: [ChatLogPage]
})
export class ChatLogPageModule { }
