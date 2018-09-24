import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  product_id:any;
  responseData:any;
  productLists:any;
  user_id:any;
  currency:any;
  price:any;
  brands:any;
  category:any;
  gender:any;
  seller_name:any;
  product_single_image:any;
  averagerating:any;
  currency_code:any;
  totallike:any;
  //product_id1:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.product_id = this.navParams.get('product_id');
    this.user_id ='';
    this.currency ='';
 //  alert(this.product_id);
   // this.user_id = this.navParams.get('user_id');
    this.productsDetails(this.product_id);
  }


  productsDetails(product_id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    let serval={
      "product_id":product_id,
    }
    
    this.authService.postData(serval,'ProductsDetails_app').then((result) => {
      this.responseData = result
     //alert(this.responseData.Ack);
     console.log('productsdetails',this.responseData);
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.productLists =  this.responseData.productList;
        this.price=this.productLists.price;
        this.brands=this.productLists.brands;
        this.category=this.productLists.category;
        this.gender=this.productLists.gender;
        this.seller_name=this.productLists.seller_name;
        this.product_single_image=this.productLists.product_single_image;
        this.averagerating=this.productLists.averagerating;
        this.currency_code=this.productLists.currency_code;
        this.totallike=this.productLists.totallike
         //console.log('arunava',this.productLists)
      }
      else
      {
        loading.dismiss();
        this.productLists = '';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

}
