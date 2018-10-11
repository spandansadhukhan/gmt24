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
  wordlists=[];
  keyword:any;
  minprice:any;
  maxprice:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
  ) {

    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchPage');
    this.brand_id = this.navParams.get('brand_id');
    this.keyword=this.navParams.get('keyword');
    this.brandproductList();
    this.maxminpriceList();
  }

  brandproductList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    let serval={
      "amount_max": 10000000,
      "amount_min":0,
      "brandList":this.brand_id,
      "keyword": this.keyword,
      "size_amount_max": 100,
      "size_amount_min": 0
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

  filter(){

    this.navCtrl.push('FilterPage',{"min":this.minprice,"max":this.maxprice})

  }


  updateKeyword(keyword){

    //alert(keyword);
   if(keyword!=""){
    let serval={
      "word":keyword
    }
    
    this.authService.postData(serval,'autofield').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        
        this.wordlists =  this.responseData.autofieldlist;
         //console.log('arunava',this.productlists)
      }
      else
      {
        this.wordlists = [];
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      console.log(err);
      
    });
  }else{
    this.wordlists = [];
    this.brandproductList();
  }
  }

  selectSearchResult(item) {

    this.keyword=item;
    this.wordlists = [];
    this.brandproductList();
  }

  maxminpriceList(){

    let serval={
      "type":1,
    }
    
    this.authService.postData(serval,'getmaxprice').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
        
        this.minprice=this.responseData.minprice;
        this.maxprice=this.responseData.maxprice;
      }
      else
      {
        this.minprice= 0;
        this.maxprice= 10000;
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  
  }




}
