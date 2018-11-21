import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Events,LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public footerIsHidden: boolean = false;
  rootPage:any;
  public id:any;
  public loguser:any;
 //public type:any;
  public istype:any;

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public profile:any;
  public change_password:any;
  public Change_Currency:any;
  public Change_Language:any;
  public My_Loyalty:any;
  public notificationsss:any;
  public subscriptionsss:any;
  public subscribed_list:any;

  public add_product:any;
  public my_product:any;
  public favorite_or_wishlist:any;
  public my_auction:any;
  public Purchased_or_Won_Auction:any;
  public My_Interest:any;
  public potential_buyers:any;

  public notification_settings:any;
  public messageses:any;
  public logouts:any;
  public Sign_In:any;
  public signups:any;
  public homes:any;
  public auction:any;
  public watches:any;
  public shops:any;
  
  

  public path:any;
  constructor(platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public events: Events) {

      this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }
   
      platform.ready().then(()=>{
       
        events.subscribe('hideFooter', (data) => {
          this.footerIsHidden = data.isHidden;
        })
      
      this.storage.get('uid').then(val => {
        this.id =val;
   
            if(this.id){
              events.publish('hideFooter', {isHidden: false});
              this.nav.setRoot('HomePage');
             
        }else{
         
          events.publish('hideFooter', {isHidden: true});
          this.nav.setRoot('AdvertisePage');
        }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

  // });
  });



})
  }
  
  ChangeToUserLaguage1(lang){
    //alert(lang+'a')
      let serval={
        "language_id":lang,
       };
       let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
   
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.profile=res.languages.profile;
         this.change_password=res.languages.change_password;
         this.Change_Currency=res.languages.Change_Currency;
         this.Change_Language = res.languages.Change_Language;
         this.My_Loyalty = res.languages.My_Loyalty;
         this.notificationsss = res.languages.notifications;
         this.subscriptionsss = res.languages.subscriptions;
         this.subscribed_list = res.languages.subscribed_list;
         this.add_product = res.languages.add_product;
         this.my_product = res.languages.my_product;
         this.favorite_or_wishlist = res.languages.favorite_or_wishlist;
         this.my_auction = res.languages.my_auction;
         this.Purchased_or_Won_Auction = res.languages.Purchased_or_Won_Auction;
         this.My_Interest = res.languages.My_Interest;
         this.potential_buyers = res.languages.potential_buyers;

         this.notification_settings = res.languages.notification_settings;
         this.messageses = res.languages.messages;
         this.logouts = res.languages.logout;
         this.Sign_In = res.languages.Sign_In;
         this.signups = res.languages.signup;
         this.homes = res.languages.home;
         this.auction = res.languages.auction;
         this.watches = res.languages.watches;
         this.shops = res.languages.shops;
         

         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }
  public logout(){
    this.storage.ready().then(() => {
     // const data=localStorage.getItem("userData");
    localStorage.removeItem('userData');
    localStorage.removeItem('selectedcurrency');
    localStorage.removeItem('language');
    localStorage.setItem('userData',"");
    this.storage.set("uid","");

   this.nav.setRoot('LoginnewPage');
  });
}

abc(){
 // alert("jdh")
  this.loguser =  JSON.parse(localStorage.getItem('userData'));   
  if(this.loguser){
    this.events.publish('hideFooter', {isHidden: false});
  if(this.loguser.user_type=="1"){
    this.istype=1;
  }else if(this.loguser.user_type=="2"){
    this.istype=2;
  }else if(this.loguser.user_type=="3"){
    this.istype=3;
  }
  }

}

// ChangeToUserLaguage()
// {
//   this.loguser =  JSON.parse(localStorage.getItem('userData'));   
//   if(this.loguser){
//     this.events.publish('hideFooter', {isHidden: false});
//   if(this.loguser.user_type=="1"){
//     this.istype=1;
//   }else if(this.loguser.user_type=="2"){
//     this.istype=2;
//   }else if(this.loguser.user_type=="3"){
//     this.istype=3;
//   }
//   }
// }
public home(){
   
  this.nav.setRoot('HomePage');
 
} 
 
public allwatches(){

  this.nav.push('SearchPage');
}

public allauctions(){

  this.nav.push('AuctionlistPage');
}

public allshops(){

  this.nav.push('AllshoplistPage');
}

public settings(){

  this.nav.push('SettingsPage');
}
  public myaccount(){
   
    this.nav.push('MyaccountPage');
     
  } 


  public changepassword(){ 
  
    this.nav.push('ChangepasswordPage');
    
    }

  public changecurrency(){ 
  
    this.nav.push('CurrencychangePage');
    
    }
    public changelanguage(){ 
  
      this.nav.push('LanguagePage');
      
      }
    
  public notifications(){ 
  
      this.nav.push('NotificationPage');
      
      }

  public addproduct(){ 

    this.nav.push('AddproductPage');
    
    }  
    public myproduct(){ 

      this.nav.push('MyproductPage');
      
      }


      public myauction(){ 

        this.nav.push('MyauctionPage');
        
        }

       public wishlist()
        {
          this.nav.push ('WishlistPage');
        }

        public purchase()
        {
          this.nav.push('ListOrderBuyerPage');
        }

        public myInterest()
        {
          this.nav.push('MyInterestPage');
        }

        public customerInterest()
        {
          this.nav.push('CustomerInterestPage');
        }




        public liveauction()
        {
          this.nav.push('LiveAuctionPage');
        }
        public loyalty()
        {
          this.nav.push('LoyaltyPage');
        }

        public messages()
        {
          this.nav.push('MessageListingPage');
        }


        public subscriptions(){

          this.nav.push('AllsubscriptionsPage');
        }

        public subscribedlist(){

          this.nav.push('SubscribedlistPage');

        }

        public signin(){

          this.nav.setRoot('LoginnewPage');
        }

        public signup(){

          this.nav.setRoot('SignupPage');
        }



        


}