import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController,ToastController,Platform,ActionSheetController} from 'ionic-angular';
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
import {  Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
declare var cordova: any;
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
  public isShow:any;
  public curcode:any;
  public curimg:any;
  loguser:any;

  map: any;
  markers = [];
  location:any;
  lat:any;
  lang:any;
  markerlatlong:any;


  lastImage:any;
  imagename = [];
  
  uploadsuccess:any;
  uploadimages=[];
  productimages=[];
  address:any;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private file: File, 
    private filePath: FilePath,
    public platform: Platform,
    public toastCtrl:ToastController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer
  ) {
    this.aForm = builder.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'gender': [null, Validators.required],
      'phone': [null, Validators.required],
      'email': [null, Validators.required],
      'country': [null, Validators.required],
      'state': [null, Validators.required],
      //'city': [null, Validators.required],
      'ibanno': [null, Validators.required],
      'bankname': [null, Validators.required],
      'language_preference': [null, Validators.required],
      'country_preference': [null, Validators.required],
     // 'address': [null, Validators.required],
      //'currency_preference': [null, Validators.required],
      
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
            //this.aForm.controls['city'].setValue(res.UserDetails.city);
            this.aForm.controls['ibanno'].setValue(res.UserDetails.ibanno);
            this.aForm.controls['bankname'].setValue(res.UserDetails.bankname);
            this.aForm.controls['language_preference'].setValue(res.UserDetails.language_preference);
            this.aForm.controls['country_preference'].setValue(res.UserDetails.country_preference);
            //this.aForm.controls['currency_preference'].setValue(res.UserDetails.currency_preference);
            this.fname=res.UserDetails.fname;
            this.lname=res.UserDetails.lname;
            this.image=res.UserDetails.profile_image;

            this.productimages=res.UserDetails.images;
            this.address=res.UserDetails.address;
            if(res.UserDetails.currency_preference){
            this.curcode=res.UserDetails.currency_preference;
            this.curimg=res.UserDetails.currency_image;
            }else{

            this.curcode='KWD';
            this.curimg='kwd.jpg';
            }

            this.stateList(res.UserDetails.country);
            this.cityList(res.UserDetails.state);  
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
      this.initlocationMap(this.lat,this.lang);
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
      this.phonecode =  '';
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
  formData['currency_preference']=this.curcode;
  formData['address']=this.address;
  formData['my_latitude']=this.lat;
  formData['my_longitude']=this.lang;
  formData.image =  this.uploadimages.toString();
  this.authService.updateprofile(formData).subscribe(res => {
   if (res.Ack == 1) {
    loading.dismiss();
      const alert = this.alertCtrl.create({
        title:'Success!',
        subTitle: res.msg,
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


show()
{
  
  this.isShow =true;
  
}

hide() {
  this.isShow =false;
}

selectcurrency(ccode,cimg){
  this.isShow =false;
this.curcode=ccode;
this.curimg=cimg;
}



initlocationMap(lat,lang) {
    

  var point = {lat: lat, lng: lang};
 // alert(JSON.stringify(point));
  let divMap = (<HTMLInputElement>document.getElementById('map'));
  this.map = new google.maps.Map(divMap, {
  center: point,
  zoom: 15,
  disableDefaultUI: true,
  draggable: true,
  zoomControl: true
  });

   var marker = new google.maps.Marker({
    map: this.map,
    position: point,
    draggable: true,
    });
    this.markers.push(marker);

    let geocoder = new google.maps.Geocoder;
    let latlng = {lat: lat, lng: lang};
    geocoder.geocode({'location': latlng}, (results, status) => {

      if (status == 'OK')
      {
          this.lat = lat;
          this.lang = lang;
          this.address = results[0].formatted_address;
          //alert(this.address);
      }
      else
      {
        alert(status);
      }

    });



    google.maps.event.addListener(marker, 'dragend', () =>{ 

     // console.log("vbhdfvgdshjgf",marker.position);
      //alert(marker.position.lat());
    let geocoder = new google.maps.Geocoder;
    let latlng = {lat: marker.position.lat(), lng: marker.position.lng()};
    geocoder.geocode({'location': latlng}, (results, status) => {

      if (status == 'OK')
      {
          this.lat = marker.position.lat();
          this.lang = marker.position.lng();
          this.address = results[0].formatted_address;
          //alert(this.address);
      }
      else
      {
        alert(status);
      }
       
    });


  });
    

}


 




 //image upload

 presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    enableBackdropDismiss: true,
    buttons: [
      {
        text: 'Take a picture',
        icon: 'camera',
        handler: () => {
          this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'From gallery',
        icon: 'images',
        handler: () => {
          this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }
    ]
  });
  actionSheet.present();
}



uploadFromCamera(sourceType){

  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });

}

private createFileName(currentName) {
  var d = new Date(),
  n = d.getTime(),
  newFileName=currentName;
  return newFileName;
}

private copyFileToLocalDir(namePath, currentName, newFileName) {
 console.log("CURRENTFILENAME",currentName);
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    console.log("NEWFILENAMEEEEEE",this.lastImage);
    this.uploadImage();
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

public pathForImage(img) {
  console.log("IMAGGGEGGEGGEGE",img);
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage() {
  // Destination URL
  var url = "https://thegmt24.com/webservice/frontend/userimageinsert_app";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "photo",
    photo: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {
    'photo':filename,
 // 'user_id':uid
     }
   // params : {'fileName': filename}
  };
  console.log("OPTIONS",options);
  const fileTransfer:FileTransferObject = this.transfer.create();
 
  let loading = this.loadingCtrl.create({
    content: 'Uploading Please Wait...'
  });
  loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    
    this.uploadsuccess=JSON.parse(data.response);

    console.log('UPLOADsp',this.uploadsuccess);

    if(this.uploadsuccess.ack==1){
      loading.dismiss();
      this.uploadimages.push(this.uploadsuccess.image);
      this.productimages.push(this.uploadsuccess.link);
      console.log('spimages',this.uploadimages);
      console.log('spimagesshow',this.productimages);
      this.presentToast('Image succesful uploaded.');
      
    }else{

      loading.dismiss();
      this.presentToast('Time out. Try again.');
    }
    
  }, err => {
    console.log("Error",err);
    loading.dismiss();
    this.presentToast('Error while uploading file.');
  });
}

//end image upload


remove_image(id)
{
 // alert(id)
 
  let alert = this.alertCtrl.create({
    title: 'Remove Image',
    message: 'Are you sure to remove image?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass:'icon-color',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        cssClass:'icon-color',
        handler: data => {
          
            this.uploadimages.splice(id, 1);
            this.productimages.splice(id,1);
          
        }
      }
    ]
  });

  alert.present();
  //alert(id)
}

//spandan

}
