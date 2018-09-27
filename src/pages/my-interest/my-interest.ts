import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the MyInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-interest',
  templateUrl: 'my-interest.html',
})
export class MyInterestPage {
  interestList: any;
  id:any;
  responseData:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService:AuthServiceProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyInterestPage');

    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'interestinproduct').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.interestList =  this.responseData.productList;
        console.log(this.interestList);
        
      }
  });

});

  }


  productdetails(product_id){
    
    this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
  }




}
