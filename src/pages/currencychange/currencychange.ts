import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
/**
 * Generated class for the CurrencychangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-currencychange',
  templateUrl: 'currencychange.html',
})
export class CurrencychangePage {
  public id:any;
  public responseData:any;
  public currencylist:any;
  public selectedcurrency:any;
  public currency:any;
  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public events: Events,
    public menu: MenuController,
  ) {
    events.publish('hideFooter', { isHidden: true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencychangePage');
    this.currencyList();
    this.menu.enable(false, 'loggedOutMenu');

  }

  currencyList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listCurrency').then((result) => {
      this.responseData = result
      console.log('currency',this.responseData);
      if( this.responseData.Ack == 1)
      {
       
        this.currencylist =  this.responseData.currencylist;
        
      }
      else
      {
        this.currencylist = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}
currencychange(currency){
  
 // console.log('bbb',currency);
  if(currency){
    this.selectedcurrency = currency;
   // alert(this.selectedcurrency);
  }else{
    this.selectedcurrency = "KWD";
  }
  
}
changecurrency(){
  localStorage.setItem('selectedcurrency', JSON.stringify({"selectedcurrency":this.selectedcurrency}));
  this.navCtrl.setRoot('HomePage');
}
}
