import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

/**
 * Generated class for the AdvertisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advertise',
  templateUrl: 'advertise.html',
})
export class AdvertisePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,) {
  }

  ionViewDidLoad() {
    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad AdvertisePage');
  }

  skip() {
    this.navCtrl.push("LoginnewPage");
  }

}
