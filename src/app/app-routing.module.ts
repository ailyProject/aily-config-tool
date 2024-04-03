import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'wifi-config',
    loadChildren: () => import('./pages/wifi-config/wifi-config.module').then(m => m.WifiConfigPageModule)
  },
  {
    path: 'model-config',
    loadChildren: () => import('./pages/model-config/model-config.module').then(m => m.ModelConfigPageModule)
  },
  {
    path: 'chat-log',
    loadChildren: () => import('./pages/chat-log/chat-log.module').then(m => m.ChatLogPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
