import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  public id:any;
  public responseData:any;
  
  public currencylists:any;
  public brandlists:any;
  public subcategorylists:any;
  public yearlists:any;
  pForm: FormGroup;
  public uploadtypeid:any;
  selectedEvent: any;
  isSelected: any;
  eventList:any;
  public timelists:any;
  public braceletlists: any;
  date:any;
  getdate:any;
  public time_slot_id:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private storage: Storage,
    private builder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private calendar: Calendar,
    private fb: FormBuilder) {


      this.pForm = fb.group({
        'type': [null, Validators.required],
        'brand': [null, Validators.required],
        'cat_id': [null, Validators.required],
        'breslet_type':[null, Validators.required],
        'model_year': [null, Validators.required],
        'currency': [null, Validators.required],
        'preferred_date': ["",""],
        "time_slot_id" : ["",""],
        'description': [null, Validators.required],
        'price': [null, Validators.required],
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
    
    this.currencyList();
    this.brandList();
    this.yearList();
    this.braceletList()
    
  }

 /* selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    var thisDate1 = "2018-05-31 00:00:00";
    var thisDate2 = "2018-06-02 00:00:00";
    this.eventList.forEach(event => {
      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }*/
  



  uploadtype(typeid){
   
     this.uploadtypeid = typeid;
     //alert(this.uploadtypeid);
   }




  brandList(){
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listbrand').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
       
        this.brandlists =  this.responseData.brandlist;
        
      }
      else
      {
        this.brandlists = '';
      }
     
    }, (err) => {
      
      console.log(err);
      
    });
  });
}

subcategoryList(bid){
   
  //alert(cid);
     
   let serval={
     "cat_id": bid,
    };
   this.authService.postData(serval,'listSubcategory').then((result) => {
     this.responseData = result
 
     if( this.responseData.Ack == 1)
     {
      
       this.subcategorylists =  this.responseData.subcategorylist;
       
     }
     else
     {
      
       this.subcategorylists = '';
     }
    
   }, (err) => {
     
     console.log(err);
     
   });
 
 }

 yearList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'getYears').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.yearlists =  this.responseData.Years;
      
    }
    else
    {
      this.yearlists = '';
    }
   
  }, (err) => {
    
    console.log(err);
    
  });
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

  
braceletList(){
   
  this.storage.get('uid').then(val => {
    this.id = val;
  let serval={
    "user_id":this.id,
   };
  this.authService.postData(serval,'listbracelet').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
     
      this.braceletlists =  this.responseData.braceletlist;
      
    }
    else
    {
      this.braceletlists = '';
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
  }else if(formData['type']== '2' && formData['preferred_date']==""){
    const alert = this.alertCtrl.create({
      title: 'Please select action date and time!',
      buttons: ['OK']
    });
    alert.present();

  }else{
    this.storage.ready().then(() => {
      localStorage.setItem('productData', JSON.stringify(formData));
      this.navCtrl.push('Addproductstep2Page');
    });
 }
}


getauctiontime(date){

  //this.date= JSON.stringify(date);
  //this.getdate=JSON.parse(this.date);
  //alert(this.date);
     
  
   let serval={
     "getdate": date.year+'-'+date.month+'-'+date.day,
     //"getdate": "2018-06-05"
    };
   this.authService.postData(serval,'getTimeslot_app').then((result) => {
     this.responseData = result
 
     if( this.responseData.Ack == 1)
     {
      
       this.timelists =  this.responseData.time;
       
     }
     else
     {
      
       this.timelists = '';
     }
    
   }, (err) => {
     
     console.log(err);
     
   });
 
 }

 auctiontimeid(tid)
  {
   //alert(tid);
    this.time_slot_id = tid;
    

  }



}
