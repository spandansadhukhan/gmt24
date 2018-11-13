import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
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
  selectedcurrency:any;
  mycurrency:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public storage: Storage,
  public authService: AuthServiceProvider,
  public loadingCtrl: LoadingController,
) {
  this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
  if(this.selectedcurrency){
    this.mycurrency = this.selectedcurrency.selectedcurrency;
  }else{
    this.mycurrency ='KWD';
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOrderBuyerPage');
    this.Listwinauction();
  }

  Listwinauction(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    this.storage.get('uid').then(val => {
      this.id = val;
      
    let serval={
      "userid":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'ListOrderBuyer').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.auctionList =  this.responseData.allorders;
        console.log(this.auctionList);
        
      }else
      {
        loading.dismiss();
        this.auctionList = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
  
  });

});

  }


  nextPage(pid)
  {
  this.navCtrl.push('AuctiondetailsPage',{"product_id":pid});
  }

}
