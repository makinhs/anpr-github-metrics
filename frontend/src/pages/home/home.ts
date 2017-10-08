import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SearchProjectPage} from '../search-project/search-project'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public searchProjectPage:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.searchProjectPage = SearchProjectPage;

  }


  public login(){
    this.navCtrl.push('SearchProjectPage');
  }
}
