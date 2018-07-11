import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { AuctionProductPage } from '../auction-product/auction-product';

/**
 * Generated class for the LoyaltyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalty',
  templateUrl: 'loyalty.html',
})
export class LoyaltyPage {


  responseData: any;
  id: any;
  loyaltyList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage:Storage, public authService: AuthServiceProvider) {
  }

  myLoyalty

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoyaltyPage');

    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'myLoyalty').then((result) => {
      this.responseData = result
      console.log ( this.responseData)
 
      if( this.responseData.Ack == 1)
      {
       
        this.loyaltyList =  this.responseData.loyaltyList;
        console.log(this.loyaltyList);
        
      }
  });

});

  }

  details()
  {
    this.navCtrl.push('LoyaltyDetailsPage')
  }

}
