import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleConfigPage } from './role-config.page';

const routes: Routes = [
  {
    path: '',
    component: RoleConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleConfigPageRoutingModule {}
