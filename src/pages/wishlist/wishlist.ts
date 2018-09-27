import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import { pointerCoord } from 'ionic-angular/util/dom';
import {Storage} from '@ionic/storage'

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage {

  public responseData:any;
  id: any;
  wishlist:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public authService: AuthServiceProvider,
public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');

    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'myFavoriteProduct').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.wishlist =  this.responseData.favouriteProductList;
        console.log(this.wishlist);
        
      }
  });

});
  
}


productdetails(product_id){
    
  this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
}



}