import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AuctiondetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auctiondetails',
  templateUrl: 'auctiondetails.html',
})
export class AuctiondetailsPage {
  isShow:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuctiondetailsPage');
  }

  show()
  {
    
    this.isShow =true;
    //console.log(prodId);
    //this.product=prodId
  }

  hide() {
    this.isShow =false;
  }

}
