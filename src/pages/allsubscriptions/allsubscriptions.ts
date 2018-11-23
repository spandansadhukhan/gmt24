import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AllsubscriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsubscriptions',
  templateUrl: 'allsubscriptions.html',
})
export class AllsubscriptionsPage {


  packagelists:any;
  public id:any;
  public responseData:any;
  public loguser:any;
  public utype:any;
  public msg:any;
  public selectedcurrency:any;
  public mycurrency:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.loguser = JSON.parse(localStorage.getItem('userData'));
      this.utype=this.loguser.user_type;
      this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
      if(this.selectedcurrency){
        this.mycurrency = this.selectedcurrency.selectedcurrency;
      }else{
        this.mycurrency ='KWD';
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllsubscriptionsPage');
    this.packageList();
  }


  packageList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.loguser = JSON.parse(localStorage.getItem('userData'));
    //this.selectedcurrency = JSON.parse(localStorage.getItem('selectedcurrency'));
console.log('dgdfg',this.loguser);
      this.id = this.loguser.user_id;
      
    let serval={
      "user_id":this.id,
      "currency":this.mycurrency,
     };
    this.authService.postData(serval,'listSubscriptions').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        console.log('dgdfg',this.packagelists);
        this.packagelists =  this.responseData.subscriptionlist;
        
      }
      else
      {
        loading.dismiss();
        this.packagelists = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

purchase(id){

this.navCtrl.push('CusdetailtsforpaymentPage',{'pid':id});

}

}
