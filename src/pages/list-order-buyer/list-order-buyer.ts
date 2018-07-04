import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the ListOrderBuyerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-order-buyer',
  templateUrl: 'list-order-buyer.html',
})
export class ListOrderBuyerPage {
  responseData: any;
  auctionList: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage,
  public authService: AuthServiceProvider
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderBuyerPage');

    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "userid":this.id,
     };
    this.authService.postData(serval,'ListOrderBuyer').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.auctionList =  this.responseData.allorders;
        console.log(this.auctionList);
        
      }
  });

});

  }

}
