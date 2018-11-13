import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AuctionlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auctionlist',
  templateUrl: 'auctionlist.html',
})
export class AuctionlistPage {

  responseData:any;
  productlists:any;
  loguser:any;
  selectedcurrency :any;
  mycurrency:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {
      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
      
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AuctionlistPage');
    this.auctionList();
  }

  auctionList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    //console.log('sp',this.loguser);
    let serval={
      "user_id":this.loguser.user_id,
      "currency":this.mycurrency,
    }
    
    this.authService.postData(serval,'auctionListSearch').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.productlists =  this.responseData.productList;
         //console.log('arunava',this.productlists)
      }
      else
      {
        loading.dismiss();
        this.productlists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

productdetails(product_id){
  
    this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
  }



  filter(){

    this.navCtrl.push('FilterPage')

  }

}
