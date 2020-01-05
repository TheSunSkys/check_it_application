import { ModalPagePage } from './../modal-page/modal-page.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckitPage } from './checkit.page';

const routes: Routes = [
  {
    path: '',
    component: CheckitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckitPage, ModalPagePage],
  entryComponents:[ModalPagePage]
})
export class CheckitPageModule {}
