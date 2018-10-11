import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public responseData:any;
  public id:any;
  public brandlists:any;
  public topmodellists:any;
  public topproductlists:any;
  public latestproductlist:any;
  wordlists:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public myApp:MyApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.myApp.abc();
    this.menu.enable(true, 'loggedOutMenu');
    this.homemenus();
  }

  homemenus(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'homeSettings_app').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.brandlists =  this.responseData.brandList;
        this.topmodellists =  this.responseData.topmodellist;
        this.topproductlists = this.responseData.topproductlist;
        this.latestproductlist=this.responseData.latestproductlist
        console.log('brand',this.brandlists)
      }
      
      else
      {
        loading.dismiss();
        this.brandlists = '';
        this.topmodellists = '';
        this.topproductlists ='';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  });

  }


//spandan end

brandproduct(bid){

  this.navCtrl.push('SearchPage',{"brand_id":bid}); 
}
productdetails(product_id){
//lert(product_id);
  this.navCtrl.push('DetailsPage',{"product_id":product_id}); 
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
  
}
}

selectSearchResult(item) {

  this.wordlists = [];
  this.navCtrl.push('SearchPage',{"keyword":item}); 
}




}
