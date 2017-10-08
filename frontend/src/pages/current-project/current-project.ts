import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'Chart.js';

/**
 * Generated class for the CurrentProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-project',
  templateUrl: 'current-project.html',
})
export class CurrentProjectPage {
  // Our childs for different charts
  // We would be using these for canvas elements
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentProjectPage');
  }


}
