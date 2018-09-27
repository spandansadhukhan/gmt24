import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';

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
  

  public path:any;
  constructor(platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider,
    public events: Events) {

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

  public logout(){
    this.storage.ready().then(() => {
     // const data=localStorage.getItem("userData");
    localStorage.removeItem('userData');
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
  }
  }

}

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
          this.nav.push ('WishlistPage')
        }

        public purchase()
        {
          this.nav.push('ListOrderBuyerPage')
        }

        public myInterest()
        {
          this.nav.push('MyInterestPage')
        }

        public liveauction()
        {
          this.nav.push('LiveAuctionPage')
        }
        public loyalty()
        {
          this.nav.push('LoyaltyPage')
        }

        public messages()
        {
          this.nav.push('MessageListingPage')
        }
}