import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiConfigPageRoutingModule } from './wifi-config-routing.module';

import { WifiConfigPage } from './wifi-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiConfigPageRoutingModule
  ],
  declarations: [WifiConfigPage]
})
export class WifiConfigPageModule {}
