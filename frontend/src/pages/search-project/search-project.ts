import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-project',
  templateUrl: 'search-project.html',
})
export class SearchProjectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchProjectPage');
  }

  openProject(){
    this.navCtrl.push('CurrentProjectPage');
  }

  public logout(){
    this.navCtrl.push('Home');
  }

}
