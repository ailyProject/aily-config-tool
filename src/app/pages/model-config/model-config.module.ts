import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelConfigPageRoutingModule } from './model-config-routing.module';

import { ModelConfigPage } from './model-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelConfigPageRoutingModule
  ],
  declarations: [ModelConfigPage]
})
export class ModelConfigPageModule {}
