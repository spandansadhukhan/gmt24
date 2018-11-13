import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the CustomerInterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-interest',
  templateUrl: 'customer-interest.html',
})
export class CustomerInterestPage {


  interestList: any;
  id:any;
  responseData:any;
  selectedcurrency:any;
  mycurrency:any;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthServiceProvider, 
    public storage: Storage,
    public loadingCtrl: LoadingController,) {

      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerInterestPage');
    this.interestlist();
  }


  interestlist(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'interestedproduct').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.interestList =  this.responseData.productList;
        console.log(this.interestList);
        
      } else
      {
        loading.dismiss();
        this.interestList ="";
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
  
  });
  
  
  
  }
  
  
    productdetails(product_id){
      
      this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
    }
  



}
