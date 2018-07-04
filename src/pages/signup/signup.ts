import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  rForm: FormGroup;
  responseData: any;
  error: string;
  busy: boolean;

  constructor(
    private builder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder
  ) {
    this.rForm = fb.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'phone':[null, Validators.required],
      'email':[null, Validators.required],
      'password': [null, Validators.required],
      'type': [null, Validators.required]
    });
    this.rForm.controls['type'].setValue('2');

  }

  onSubmit(formData) {
    
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();

    if (!this.rForm.valid) {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signup Failed!',
        subTitle: "Please fill all the details.",
        buttons: ['OK']
      });
      alert.present();
    }else{
    
     this.authService.signup(formData).subscribe(res=>{
       if(res){
        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
           title: res.msg,
           buttons: ['OK']
         });
       alert.present();
       }
      },err=>{
        loading.dismiss();
       //console.log(err);
        const alert = this.alertCtrl.create({
          title: 'Auth Failed!',
          buttons: ['OK']
        });
        alert.present();
     });
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  login() {
    this.navCtrl.push('LoginnewPage');
  }



}
