import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentProjectPage } from './current-project';

@NgModule({
  declarations: [
    CurrentProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentProjectPage),
  ],
})
export class CurrentProjectPageModule {}
