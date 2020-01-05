import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'checkit', loadChildren: './checkit/checkit.module#CheckitPageModule' },
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
  { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'popphotoprofile', loadChildren: './popphotoprofile/popphotoprofile.module#PopphotoprofilePageModule' },
  { path: 'datastats', loadChildren: './datastats/datastats.module#DatastatsPageModule' },
  { path: 'myclass', loadChildren: './myclass/myclass.module#MyclassPageModule' },
  { path: 'mystudent', loadChildren: './mystudent/mystudent.module#MystudentPageModule' },
  { path: 'datedetail', loadChildren: './datedetail/datedetail.module#DatedetailPageModule' },
  { path: 'getmap', loadChildren: './getmap/getmap.module#GetmapPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
