import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  brand_id:any;
  responseData:any;
  productlists:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
  ) {


  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchPage');
    this.brand_id = this.navParams.get('brand_id');
    
    this.brandproductList(this.brand_id);
  }

  brandproductList(id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    let serval={
      "brandList":id
    }
    
    this.authService.postData(serval,'ProductListSearch').then((result) => {
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
}
