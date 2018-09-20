import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
})
export class MyaccountPage {
  aForm : FormGroup;
  public id:any;
  public responseData:any;
  public countrylists:any;
  public statelists:any;
  public citylists:any;
  public currencylists:any;
  public fname:any;
  public lname:any;
  public image:any;
  public phonecode:any;
  lat:any;
  lang:any;
  map: any;
  markers = [];
  geocoder:any;
  dragaddress:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
  ) {
    
    this.aForm = builder.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'gender': [null, Validators.required],
      'phone': [null, Validators.required],
      'email': [null, Validators.required],
      'country': [null, Validators.required],
      'state': [null, Validators.required],
      'city': [null, Validators.required],
      'ibanno': [null, Validators.required],
      'bankname': [null, Validators.required],
      'language_preference': [null, Validators.required],
      'country_preference': [null, Validators.required],
      'currency_preference': [null, Validators.required],
      'address': [null, null],
      //'my_latitude': [null, null],
      //'my_longitude': [null, null],
      
    });

    this.storage.ready().then(()=>{
      this.storage.get('uid').then(val => {
        console.log(val);
        if(val){
          this.authService.getdetails({ user_id: val }).subscribe(res => {
           // console.log(res.UserDetails.first_name);
            this.aForm.controls['fname'].setValue(res.UserDetails.fname);
            this.aForm.controls['lname'].setValue(res.UserDetails.lname);
            this.aForm.controls['gender'].setValue(res.UserDetails.gender);
            this.aForm.controls['phone'].setValue(res.UserDetails.phone);
            this.aForm.controls['email'].setValue(res.UserDetails.email);
            this.aForm.controls['country'].setValue(res.UserDetails.country);
            this.aForm.controls['state'].setValue(res.UserDetails.state);
            this.aForm.controls['city'].setValue(res.UserDetails.city);
            this.aForm.controls['ibanno'].setValue(res.UserDetails.ibanno);
            this.aForm.controls['bankname'].setValue(res.UserDetails.bankname);
            this.aForm.controls['language_preference'].setValue(res.UserDetails.language_preference);
            this.aForm.controls['country_preference'].setValue(res.UserDetails.country_preference);
            this.aForm.controls['currency_preference'].setValue(res.UserDetails.currency_preference);
            this.aForm.controls['address'].setValue(res.UserDetails.address);
            
            this.fname=res.UserDetails.fname;
            this.lname=res.UserDetails.lname;
            this.image=res.UserDetails.profile_image;
            this.stateList(res.UserDetails.country);
            //this.cityList(res.UserDetails.state);  
            this.dragaddress = res.UserDetails.address;
          });
        }
        
      });
    }).catch();

    let loading = this.loadingCtrl.create({
      content: 'Fetching your location...'
    });
    loading.present();
      this.geolocation.getCurrentPosition().then((resp) => {
      console.log('splocation',resp);
      this.lat = resp.coords.latitude;
      this.lang = resp.coords.longitude;
      this.initMap(this.lat,this.lang);
      loading.dismiss();
    }).catch((error) => {
      loading.dismiss();
      console.log('Error getting location', error);
    });



}

  

  ionViewDidLoad() {
    this.countryList();
    this.currencyList();

  }


  private initMap(lat,lang) {

    this.dragaddress;
    var point = {lat: lat, lng: lang};
    let divMap = (<HTMLInputElement>document.getElementById('map'));
    this.map = new google.maps.Map(divMap, {
    center: point,
    zoom: 14,
    disableDefaultUI: true,
    draggable: true,
    zoomControl: true
    });
     var marker = new google.maps.Marker({
       map: this.map,
       position: point,
       draggable: true,
       });
       //this.markers.push(marker);
       google.maps.event.addListener(marker, 'dragend', function ()
       {
       // alert(this.dragaddress);
                 //console.log('marker',marker);
           geocodePosition(marker.getPosition());
          
          //alert(marker.getPosition());
       });

     function  geocodePosition(pos)
    {
      //alert(pos);
        var lat, lng, address;
      var  geocoder = new google.maps.Geocoder();
      console.log('ertertertre',geocoder)
        geocoder.geocode
                ({
                    latLng: pos
                },
                function (results, status)
                {
                    if (status == google.maps.GeocoderStatus.OK)
                    {
                        lat = pos.lat();
                        lng = pos.lng();
                        address = results[0].formatted_address;
                        //alert("Latitude: " + lat + "\nLongitude: " + lng + "\nAddress: " + address);
                        //alert(this.dragaddress)
                        //alert(address);
                        return address;
                        this.lat=lat;
                        this.lang=lng;
                        this.dragaddress=address;
                        
                      alert(this.dragaddress);
                        //var input= document.getElementById("address") as HTMLInputElement;
                        //input=address;
                        //this.aForm.controls['address'].setValue(address);
                        
                    }
                    else
                    {
                     
                       // $("#mapErrorMsg").html('Cannot determine address at this location.' + status).show(100);
                    }
                }
                );
    }
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
      this.phonecode =  this.responseData.phonecode;
      
    }
    else
    {
     
      this.statelists = '';
      this.phonecode = '';
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

 currencyList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'listCurrency').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.currencylists =  this.responseData.currencylist;
      
    }
    else
    {
     
      this.currencylists = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });
});
}






onSubmit(formData) {

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();

  if (!this.aForm.valid) {
    loading.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Update Failed!',
      subTitle: "Please fill all the details.",
      buttons: ['OK']
    });
    alert.present();
  }else{
  
  this.storage.get('uid').then(val => {
  formData['user_id'] = val;
  this.authService.updateprofile(formData).subscribe(res => {
   if (res.Ack == 1) {
    loading.dismiss();
      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present();
    } 
    else {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: res.msg,
        buttons: ['OK']
      });
      alert.present();
    }
  }, err => {
    loading.dismiss();
    console.log(err);
  });
});
}
}







}
