import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PopphotoprofilePage } from './popphotoprofile.page';

const routes: Routes = [
  {
    path: '',
    component: PopphotoprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PopphotoprofilePage]
})
export class PopphotoprofilePageModule {}
