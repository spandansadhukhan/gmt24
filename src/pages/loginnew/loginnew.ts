import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

import { MenuController } from 'ionic-angular';
//import {MyApp} from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-loginnew',
  templateUrl: 'loginnew.html',
})
export class LoginnewPage {

public loguser:any;
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public device_type: AbstractControl;
  public device_token_id: AbstractControl;


  myform: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;
  isChecked: boolean;
  disabled: any;
  isLoggedIn: boolean = false;
  users: any;
  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    
    public loadingCtrl: LoadingController,
    //private myApp:MyApp
  ) {

    this.form = builder.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  

  ionViewDidLoad() {
  
    this.menu.enable(false, 'loggedOutMenu');
    console.log('ionViewDidLoad LoginnewPage');

    }



  forgetpass(){
   
    this.navCtrl.push("ForgetpassPage");
  }

  



  loginNow(formData) { 

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    //formData['device_token_id'] ='asdfa45645645646knllkjlkj4356546456';
    //formData['device_type']='android';
    
    this.authService.login(formData).subscribe(res => {
      //console.log('spandan',res);
      if(res.Ack==1){
        loading.dismiss();
        this.storage.ready().then(() => {
          localStorage.setItem('userData', JSON.stringify(res.UserDetails));
           //console.log("USERDATA", JSON.stringify(res.UserDetails));
                this.storage.set('uid', res.UserDetails['user_id']).then(() => {
                this.navCtrl.setRoot('HomePage');
              });
        });
      
    }else{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present(); 
    }
    }, err => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Auth Failed!',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

}
