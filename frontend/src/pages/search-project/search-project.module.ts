import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchProjectPage } from './search-project';

@NgModule({
  declarations: [
    SearchProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchProjectPage),
  ],
})
export class SearchProjectPageModule {}
