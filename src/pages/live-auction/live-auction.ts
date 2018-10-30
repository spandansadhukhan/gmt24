import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LiveAuctionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-live-auction',
  templateUrl: 'live-auction.html',
})
export class LiveAuctionPage {


  bidForm: FormGroup;
  timeInSeconds:any;
  remainingTime: any;
  displayTime:any;
  hasStarted:boolean;
  hasFinished:boolean;
  runTimer:boolean;



  product_id:any;
  responseData:any;
  productLists:any;
  user_id:any;
  currency:any;
  price:any;
  brands:any;
  category:any;
  gender:any;
  product_single_image:any;
  currency_code:any;
  loguser:any;
  countuniquebids:any;
  maxbiddername:any;
  higestbidderbid:any;
  usermaxbid:any;
  nextbidprice:any;
  bidincrement:any;
  thresholdprice:any;
  baseauctionprice:any;
  bidcount:any;
  lastbidvalue:any;
  time_difference:any;
  bidmatch:boolean=false;
  winnerid:any;
  seller_id:any;
  refreshIntervalId:any;
  bidhistory:any;
  show:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public toastCtrl:ToastController,
    public builder: FormBuilder,
    public alertCtrl: AlertController,) {

    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    this.user_id=this.loguser.user_id;

    this.bidForm = builder.group({
      'bid': [null, null],
    });

    


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LiveAuctionPage');
    this.product_id = this.navParams.get('product_id');
    this.productsDetails(this.product_id);
  }

  ionViewWillEnter(){

    this.refreshIntervalId =  setInterval(() => {
      let serval1={
        "product_id":this.product_id,
        "user_id":this.user_id,
      }
      this.authService.postData(serval1,'ProductsDetails_app').then((result) => {
        this.responseData = result
        if( this.responseData.Ack == 1)
        {
          this.productLists =  this.responseData.productList;
          this.currency_code=this.productLists.currency_code;
          this.countuniquebids=this.productLists.countuniquebids;
          this.maxbiddername=this.productLists.maxbiddername;
          this.higestbidderbid=this.productLists.higestbidderbid;
          this.usermaxbid=this.productLists.maxbid;
          this.nextbidprice=this.productLists.nextbidprice;
          this.bidincrement=this.productLists.bidincrement;
          this.thresholdprice=this.productLists.thresholdprice;
          this.bidcount=this.productLists.bidcount;
          this.lastbidvalue=this.productLists.lastbidvalue;
          this.bidhistory=this.productLists.bidhistory
        }
      });
      }, 1000);
  }

  ionViewWillLeave(){

    clearInterval(this.refreshIntervalId);

  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  initTimer(time) {
   
    this.timeInSeconds = time;//define total seceond 
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }
  
  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
  
      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
       // alert('times out')
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString ;
  }



  productsDetails(product_id){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    let serval={
      "product_id":product_id,
      "user_id":this.user_id
    }
    
    this.authService.postData(serval,'ProductsDetails_app').then((result) => {
      this.responseData = result
     
     //console.log('productsdetails',this.responseData);
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
       
        this.productLists =  this.responseData.productList;
        this.price=this.productLists.price;
        this.brands=this.productLists.brands;
        this.category=this.productLists.category;
        this.gender=this.productLists.gender;
        this.product_single_image=this.productLists.product_single_image;
        this.currency_code=this.productLists.currency_code;
        this.seller_id=this.productLists.seller_id;
        this.countuniquebids=this.productLists.countuniquebids;
        this.maxbiddername=this.productLists.maxbiddername;
        this.higestbidderbid=this.productLists.higestbidderbid;
        this.usermaxbid=this.productLists.maxbid;
        this.nextbidprice=this.productLists.nextbidprice;
        this.bidincrement=this.productLists.bidincrement;
        this.thresholdprice=this.productLists.thresholdprice;
        this.baseauctionprice=this.productLists.baseauctionprice;
        this.bidcount=this.productLists.bidcount;
        this.lastbidvalue=this.productLists.lastbidvalue;
        this.time_difference=this.productLists.time_difference;
        this.bidhistory=this.productLists.bidhistory
        this.initTimer(this.time_difference);
        this. startTimer()
      }
      else
      {
        loading.dismiss();
        this.productLists = '';
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

checkinputbid(bid1,nbid,bidi,basebid){
//alert(basebid);
    if(bid1.bid >= nbid && ((bid1.bid-basebid)%bidi)<= 0)
    {
      //alert();
     this.bidmatch = true;
    }
    else{
      
      this.bidmatch = false;
      //this.presentToast('Bid increment multiple of '+bidi+'.');
    }
  
}

bidsubmit(fromdata){
  
  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();
 
  let serval={
    "product_id":this.product_id,
    "user_id":this.user_id
  }
  
  this.authService.postData(serval,'checkauctionvaliditybeforeaddbid').then((result) => {
    this.responseData = result
   
   console.log('productsdetails',this.responseData);
    if( this.responseData.Ack == 1)
    {
      this.addbid(fromdata.bid);
      loading.dismiss();
    }
    else if(this.responseData.Ack == 2)
    {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: "Congratulation!",
        subTitle:"You Win This Auction. PLease Pay Now.",
        buttons: ['OK']
      });
      alert.present();
      this.winnerid = this.responseData.auctionwinner;

    }else{

      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: "Sorry!",
        subTitle:"Better luck next time.",
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.setRoot('HomePage');
    }
   
  }, (err) => {
    loading.dismiss();
    console.log(err);
    
  });

}

addbid(bid){
 
  let serval={
    "productid":this.product_id,
    "userid":this.user_id,
    "bidprice":bid,
    "bidincrement":this.bidincrement,
    "currency":this.currency_code,
    "uploaderid":this.seller_id,
  }
  //console.log('bidfromdata',serval);
  this.authService.postData(serval,'bidsubmit').then((result) => {
    this.responseData = result
   
    if( this.responseData.Ack == 1)
    {
      /*let serval1={
        "product_id":this.product_id,
        "user_id":this.user_id,
        
      }
      this.authService.postData(serval1,'ProductsDetails_app').then((result) => {
        this.responseData = result
       
       //console.log('productsdetails',this.responseData);
        if( this.responseData.Ack == 1)
        {
          
          this.productLists =  this.responseData.productList;
          this.currency_code=this.productLists.currency_code;
          this.countuniquebids=this.productLists.countuniquebids;
          this.maxbiddername=this.productLists.maxbiddername;
          this.higestbidderbid=this.productLists.higestbidderbid;
          this.usermaxbid=this.productLists.maxbid;
          this.nextbidprice=this.productLists.nextbidprice;
          this.bidincrement=this.productLists.bidincrement;
          this.thresholdprice=this.productLists.thresholdprice;
          this.bidcount=this.productLists.bidcount;
          this.lastbidvalue=this.productLists.lastbidvalue;

        }
        else
        {
          
          this.productLists = '';
        }
       
      }, (err) => {
        
        console.log(err);
        
      });*/

      this.bidmatch = false;
      this.presentToast('Bid sumitted successfully.');
    }
    else{

      const alert = this.alertCtrl.create({
        title: "Sorry!",
        subTitle:"Something went wrong.",
        buttons: ['OK']
      });
      alert.present();
      
    }
   
  }, (err) => {
    console.log(err);
    const alert = this.alertCtrl.create({
      title: "Error!",
      subTitle:"Error occured.",
      buttons: ['OK']
    });
    alert.present();
  });

}


toggle() {

  this.show = !this.show;
  
}


}
