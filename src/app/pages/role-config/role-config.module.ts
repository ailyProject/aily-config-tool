import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleConfigPageRoutingModule } from './role-config-routing.module';

import { RoleConfigPage } from './role-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleConfigPageRoutingModule
  ],
  declarations: [RoleConfigPage]
})
export class RoleConfigPageModule {}
