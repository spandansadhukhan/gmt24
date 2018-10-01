import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController,ToastController,AlertController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {


  images = ['item-1.jpg', 'item-2.jpg', 'item-3.jpg', 'item-4.jpg'];

  sliderimages:any;
  product_id:any;
  responseData:any;
  productLists:any;
  user_id:any;
  currency:any;
  price:any;
  brands:any;
  category:any;
  gender:any;
  seller_name:any;
  product_single_image:any;
  averagerating:any;
  currency_code:any;
  totallike:any;
  ptype:any;
  seller_id:any;
  loguser:any;
  interest:any;
  is_fav:any;

  seller_phone:any;
  seller_address:any;
  breslet_type:any;
  size:any;
  model_year:any;
  movement:any;
  date_purchase:any;
  status_watch:any;
  description:any;
  reference_no:any;
  ctime:any;
  start_time:any;
  reviews:any;
  isShow:boolean=false;
  //product_id1:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
    public toastCtrl:ToastController,
    public alertCtrl: AlertController
) {
    
    this.loguser =  JSON.parse(localStorage.getItem('userData'));
    this.user_id=this.loguser.user_id;


  }


  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.product_id = this.navParams.get('product_id');
    //this.user_id ='';
    //this.currency ='';
 
    this.productsDetails(this.product_id);
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
     //alert(this.responseData.Ack);
     console.log('productsdetails',this.responseData);
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.ptype =  this.responseData.type;
        this.is_fav= this.responseData.is_fav;
        this.productLists =  this.responseData.productList;
        this.price=this.productLists.price;
        this.brands=this.productLists.brands;
        this.category=this.productLists.category;
        this.gender=this.productLists.gender;
        this.seller_name=this.productLists.seller_name;
        this.product_single_image=this.productLists.product_single_image;
        this.averagerating=this.productLists.averagerating;
        this.currency_code=this.productLists.currency_code;
        this.totallike=this.productLists.totallike;
        this.seller_id=this.productLists.seller_id;
        this.seller_phone=this.productLists.seller_phone;
        this.seller_address=this.productLists.seller_address;
        this.breslet_type=this.productLists.breslet_type;
        this.size=this.productLists.size;
        this.model_year=this.productLists.model_year;
        this.movement=this.productLists.movement;
        this.date_purchase=this.productLists.date_purchase;
        this.status_watch=this.productLists.status_watch;
        this.description=this.productLists.description;
        this.reference_no=this.productLists.reference_no;
        this.start_time=this.productLists.start_time;
        this.ctime=this.productLists.ctime;
        this.interest=this.productLists.interest;
        this.sliderimages=this.productLists.image;
        this.reviews=this.responseData.reviews
         //console.log('arunava',this.productLists)
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


interestedEmailToVendor(sellerid,type){

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();
  this.loguser =  JSON.parse(localStorage.getItem('userData'));
  let serval={
    "product_id":this.product_id,
    "user_id":this.loguser.user_id,
    "seller_id":sellerid,
    "type":type,
  }
  
  this.authService.postData(serval,'interestedEmailToVendor').then((result) => {
    this.responseData = result
   //alert(this.responseData.Ack);
  // console.log('mailsend',this.responseData);
    if( this.responseData.Ack == 1)
    {
      
      loading.dismiss();
      this.productsDetails(this.product_id);
      this.presentToast('Interest shown successfully.');
      
    }
    else
    {
      loading.dismiss();
      this.presentToast('Something went worng. Please try after some time.');
    }
   
  }, (err) => {
    loading.dismiss();
    this.presentToast('Error occured.');
    console.log(err);
    
  });



}


favourite(sellerid){

  let loading = this.loadingCtrl.create({
    content: 'Please Wait...'
  });
  loading.present();
  this.loguser =  JSON.parse(localStorage.getItem('userData'));
  let serval={
    "product_id":this.product_id,
    "user_id":this.loguser.user_id,
    "seller_id":sellerid,
  }
  
  this.authService.postData(serval,'addFavoriteProduct').then((result) => {
    this.responseData = result
  
    if( this.responseData.Ack == 1)
    {
      
      this.totallike=this.responseData.totallike;
      this.is_fav=this.responseData.is_fav;
      loading.dismiss();
            
    }
    else
    {
      loading.dismiss();
      this.presentToast('Something went worng. Please try after some time.');
    }
   
  }, (err) => {
    loading.dismiss();
    this.presentToast('Error occured.');
    console.log(err);
    
  });
}


gotobid(uid){

  let alert = this.alertCtrl.create({
    title: 'Enter password',
    inputs: [
      
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Continue',
        handler: data => {
          if (data.password) {

            this.loguser =  JSON.parse(localStorage.getItem('userData'));
            let serval={
              
              "userid":this.loguser.user_id,
              "password":data.password,
            }
            
            this.authService.postData(serval,'checkpassword').then((result) => {
              this.responseData = result
            
              if( this.responseData.Ack == 1)
              {
                this.navCtrl.push('LiveAuctionPage',{"product_id":this.product_id}); 
              }
              else
              {
                this.presentToast('Plsease enter correct password.');
              }
             
            }, (err) => {
              
              this.presentToast('Error occured.');
              console.log(err);
              
            });
          }

           else {
            // invalid login
            return false;
          }
        }
      }
    ]
  });
  alert.present();

  
}



show()
  {
    
    this.isShow =true;
    //console.log(prodId);
    //this.product=prodId
  }

  hide() {
    this.isShow =false;
  }



}
