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
  countrylist:any;
  phonecode:any;
  passwordmatch: boolean = false;

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
      'type': [null, Validators.required],
      'country': [null, Validators.required],
      'confirm_password' : [null, Validators.required]
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
       if(res.smsstatus==1){
        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
          title: 'Success!',
           subTitle: res.msg,
           buttons: ['OK']
         });
       alert.present();
       this.navCtrl.push('VerifyOtpPage',{'mobile':res.phone,'userid':res.user_id,'resend': '0'});
       }else{

        loading.dismiss();
        console.log(res);
         const alert = this.alertCtrl.create({
           title: 'Error!',
           subTitle: res.msg,
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

  listcountry(){

    this.authService.countrylist({}).subscribe(res=>{
      if(res.Ack==1){
       
       //console.log(res.countrylist);
      this.countrylist=res.countrylist;
      }else{
        this.countrylist="";
      }
     },err=>{
       
      //console.log(err);
       
    });

  }

  liststate(cid){

    this.authService.satelist({"c_id": cid}).subscribe(res=>{
      if(res.Ack==1){
       
       //console.log(res.countrylist);
      this.phonecode=res.phonecode;
      }else{
        this.phonecode="";
      }
     },err=>{
       
      //console.log(err);
       
    });

  }

  public checkpassword(conpass,frmval)
  {
    //console.log(frmval.password);
   // console.log(conpass);
    if(frmval.password == conpass)
    {
     this.passwordmatch = true;
    }
    else{
      this.passwordmatch = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.listcountry();
  }


  login() {
    this.navCtrl.push('LoginnewPage');
  }



}
