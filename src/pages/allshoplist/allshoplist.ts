import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AllshoplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allshoplist',
  templateUrl: 'allshoplist.html',
})
export class AllshoplistPage {

  responseData:any;
  shoplists:any;
  loguser:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllshoplistPage');
    this.allshopList();
  }

  allshopList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    //console.log('sp',this.loguser);
    let serval={
      "user_id":this.loguser.user_id
    }
    
    this.authService.postData(serval,'allShopListing').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.shoplists =  this.responseData.allshoplist;
         //console.log('arunava',this.productlists)
      }
      else
      {
        loading.dismiss();
        this.shoplists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}


productlist(id){

this.navCtrl.push('ShopproductlistPage',{"shopid":id});
  
}



}
