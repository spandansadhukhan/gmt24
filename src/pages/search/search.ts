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
  minprice:any=0;
  maxprice:any=10000000;
  searchdata:any;

  catid:any="";
  movementid:any="";
  sellerid:any="";
  statusid:any="";
  braceletid:any="";
  minslidesize:any=0;
  maxslidesize:any=100;
  stateid:any="";
  genderid:any="";
  yearid:any="";
  countryid:any="";
  selectedcurrency:any;



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
    
    
    if(this.navParams.get('param')){
    this.searchdata= JSON.parse(this.navParams.get('param'));
    if(this.searchdata.brand!=""){
    this.brand_id=this.searchdata.brand;
    }
    if(this.searchdata.brand!=""){
      this.brand_id=this.searchdata.brand;
      }
      this.catid=this.searchdata.catid;
      this.movementid=this.searchdata.movementid;
      this.sellerid=this.searchdata.sellerid;
      this.statusid=this.searchdata.statusid;
      this.minprice=this.searchdata.minprice;
      this.maxprice=this.searchdata.maxprice;
      this.braceletid=this.searchdata.braceletid;
      this.minslidesize=this.searchdata.minslidesize;
      this.maxslidesize=this.searchdata.maxslidesize;
      this.stateid=this.searchdata.stateid;
      this.genderid=this.searchdata.genderid;
      this.yearid=this.searchdata.yearid;
      this.countryid=this.searchdata.countryid; 
      console.log('searchdata',this.searchdata);
      
    }
    this.brandproductList();
    this.maxminpriceList();
  }

  brandproductList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
    let serval={
      "amount_max": this.maxprice,
      "amount_min":this.minprice,
      "brandList":this.brand_id,
      "breslettype":this.braceletid,
      "category":this.catid,
      "country_id":this.countryid,
      "gender":this.genderid,
      "keyword": this.keyword,
      "movement":this.movementid,
      "sellerList":this.sellerid,
      "size_amount_max": this.maxslidesize,
      "size_amount_min": this.minslidesize,
      "state_id":this.stateid,
      "statuslist":this.statusid,
      "year":this.yearid,
      "currency":this.selectedcurrency.selectedcurrency,
      
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
