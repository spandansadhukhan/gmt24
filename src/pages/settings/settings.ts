import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public language:any;
  public selectedlanguage:any;
  public languages:any;
  public When_I_receive_a_new_message:any;
  public Yes:any;
  public No:any;
  public notify_me_when_my_product_is_approved_or_added:any;
  public notify_me_when_my_auction_is_approved_or_added:any;
  public Notify_me_When_my_product_has_been_reviewed:any;
  public Save_Changes:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,
  ) {

    this.languages = JSON.parse(localStorage.getItem('language'));
    //console.log('Arunavalang',this.languages)
    if(this.languages){
      this.selectedlanguage = this.languages.language;
    }else{
      this.selectedlanguage ='1';
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  this.ChangeToUserLaguage(this.selectedlanguage);
  }
ChangeToUserLaguage(lang){
    //alert(lang+'a')
      let serval={
        "language_id":lang,
       };
       let loading = this.loadingCtrl.create({
        content: 'Please Wait...'
      });
      loading.present();
      /*this.authService.postData(serval,'changeLaguage').then((result) => {
        this.language = result.languages
        console.log('language',this.language.languages.top_brands);
        
       
      }, (err) => {
        
        console.log(err);
        
      });*/
      
      this.authService.changeLaguage(serval).subscribe(res=>{
        
        if(res.Ack==1){
         loading.dismiss();
        //console.log(res.languages)
         console.log("splang",res.languages);
         this.When_I_receive_a_new_message=res.languages.When_I_receive_a_new_message;
         this.Yes=res.languages.Yes;
         this.No=res.languages.No;
         this.notify_me_when_my_product_is_approved_or_added = res.languages.notify_me_when_my_product_is_approved_or_added;
         this.notify_me_when_my_auction_is_approved_or_added = res.languages.notify_me_when_my_auction_is_approved_or_added;
         this.Notify_me_When_my_product_has_been_reviewed = res.languages.Notify_me_When_my_product_has_been_reviewed;
         this.Save_Changes = res.languages.Save_Changes;
         
         //this.Cancel= res.languages.Cancel;
        }else{
    
         //loading.dismiss();
        
        }
       },err=>{
         //loading.dismiss();
        
      });
    
    }

}
