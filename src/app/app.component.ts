import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  public id:any;
  public loguser:any;
 //public type:any;
  public istype:any;
  

  public path:any;
  constructor(platform: Platform,
    private storage: Storage, statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public authService: AuthServiceProvider) {

      platform.ready().then(()=>{
       
    
      
      this.storage.get('uid').then(val => {
        this.id =val;
    
   // alert(val);
            if(this.id){

              this.nav.setRoot('HomePage');
             
        }else{
          //location.reload();
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
   
  if(this.loguser.user_type=="1"){
    this.istype=1;
  }else if(this.loguser.user_type=="2"){
    this.istype=2;
  }
  }

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

}