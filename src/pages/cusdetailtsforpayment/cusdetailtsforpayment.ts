import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the CusdetailtsforpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cusdetailtsforpayment',
  templateUrl: 'cusdetailtsforpayment.html',
})
export class CusdetailtsforpaymentPage {

  customerForm: FormGroup;
  pid:any;
  responseData:any;
  loguser:any;
  packagedetails:any;
  price:any;
  url:any;

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',
  }



  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private builder: FormBuilder,
    private theInAppBrowser: InAppBrowser,) {

      this.customerForm = builder.group({
     
        'name': [null, Validators.required],
        'email': [null, Validators.required],
        'phone': [null, Validators.compose([Validators.required,Validators.pattern('[0-9]{10}')])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CusdetailtsforpaymentPage');
    this.pid=this.navParams.get('pid');
    this.packageDetails();
    //this.loguser = JSON.parse(localStorage.getItem('userData'));
    //console.log('dfdf',this.loguser);
  }

  
  packageDetails(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    //this.loguser = JSON.parse(localStorage.getItem('userData'));
    let serval={
      "package_id":this.pid,
      
     };
    this.authService.postData(serval,'packagedetails').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.packagedetails =  this.responseData.packagedetails;
        this.price=this.packagedetails.price;

      }
      else
      {
        loading.dismiss();
        this.packagedetails = '';
        
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}


submit(formData) {
  
  this.loguser = JSON.parse(localStorage.getItem('userData'));
  formData.user_id = this.loguser.user_id;
  formData.subscription_id=this.pid;

  console.log('dfdf',formData);
  this.authService.UserSubscriptionpayment(formData).subscribe(res => {
   if (res.Ack == 1) {
   
    let target = "_self";
    let browserInst = new InAppBrowser();
    let browser = browserInst.create(res.url, 'target', this.options)
    } 
    else {

      const alert = this.alertCtrl.create({
        title: 'Something went wrong.',
        buttons: ['OK']
      });
      alert.present();
    }
  }, err => {
    console.log(err);
  });

}


}
