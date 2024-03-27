import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelConfigPage } from './model-config.page';

const routes: Routes = [
  {
    path: '',
    component: ModelConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelConfigPageRoutingModule {}
