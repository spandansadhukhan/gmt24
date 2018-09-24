import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the Addproductstep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproductstep2',
  templateUrl: 'addproductstep2.html',
})
export class Addproductstep2Page {

  public id:any;
  public responseData:any;
  public countrylists:any;
  public statelists:any;
  public citylists:any;
  public statuslists:any;
  public loguser;
  pForm: FormGroup;
  movementlist:any;
  phonecode:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    private fb: FormBuilder,
    public alertCtrl: AlertController) {

      this.pForm = fb.group({
        'movement': [null, Validators.required],
        'gender': [null, Validators.required],
        'reference': [null, Validators.required],
        'status':[null, Validators.required],
        'owner_number': [null, Validators.required],
        'country': [null, Validators.required],
        'state': [null, Validators.required],
        'city': [null, ""],
        'date_of_purchase': ["",""],
        
      });
      this.storage.ready().then(()=>{
        this.storage.get('uid').then(val => {
          console.log(val);
          if(val){
            this.authService.getdetails({ user_id: val }).subscribe(res => {
      this.pForm.controls['country'].setValue(res.UserDetails.country);
      this.pForm.controls['state'].setValue(res.UserDetails.state);
      this.pForm.controls['city'].setValue(res.UserDetails.city);
      this.stateList(res.UserDetails.country);
      this.cityList(res.UserDetails.state);  
            });
          };
        });
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addproductstep2Page');
    this.countryList();
    this.statusList();
    this.movementList();
    //this.loguser =  JSON.parse(localStorage.getItem('productData'));
   // alert(this.loguser.price);
  }


  countryList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listcountry').then((result) => {
      this.responseData = result
  
      if( this.responseData.Ack == 1)
      {
       
        this.countrylists =  this.responseData.countrylist;
        
      }
      else
      {
        this.countrylists = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}


stateList(cid){
   
 //alert(cid);
    
  let serval={
    "c_id": cid,
   };
  this.authService.postData(serval,'liststate').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.statelists =  this.responseData.statelist;
      this.phonecode=this.responseData.phonecode;
    }
    else
    {
     
      this.statelists = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });

}


cityList(ctid){
   
  //alert(cid);
     
   let serval={
     "s_id": ctid,
    };
   this.authService.postData(serval,'listcity').then((result) => {
     this.responseData = result
 
     if( this.responseData.Ack == 1)
     {
      
       this.citylists =  this.responseData.citylist;
       
     }
     else
     {
      
       this.citylists = '';
     }
    
   }, (err) => {
     
     console.log(err);
     
   });
 
 }

 statusList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'liststatus').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.statuslists =  this.responseData.statuslist;
      
    }
    else
    {
      this.statuslists = '';

    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}

movementList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'listmovement').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.movementlist =  this.responseData.movementlist;
      
    }
    else
    {
      this.movementlist = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}




onSubmit(formData){
  if (!this.pForm.valid) {
    const alert = this.alertCtrl.create({
      title: 'Product Add Failed!',
      subTitle: "Please fill all the details.",
      buttons: ['OK']
    });
    alert.present();
  }else{
    this.storage.ready().then(() => {
      localStorage.setItem('productData2', JSON.stringify(formData));

  this.navCtrl.push('Addproductstep3Page');
    });
  }
 }

}
