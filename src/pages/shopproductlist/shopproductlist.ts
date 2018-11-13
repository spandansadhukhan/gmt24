import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the ShopproductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopproductlist',
  templateUrl: 'shopproductlist.html',
})
export class ShopproductlistPage {

  shop_id:any;
  productlists:any;
  responseData:any;
  selectedcurrency:any;
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
    console.log('ionViewDidLoad ShopproductlistPage');
    this.shop_id = this.navParams.get('shopid');
    this.shopproductList(this.shop_id);
  }

  shopproductList(id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   // this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    let serval={
      "shop_id":id,
      "currency":this.mycurrency,
    }
    
    this.authService.postData(serval,'ShopListSearch').then((result) => {
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
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

productdetails(product_id){
  //lert(product_id);
    this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
  }

  filter(){

    this.navCtrl.push('FilterPage')

  }

}
