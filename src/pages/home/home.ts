import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public responseData:any;
  public id:any;
  public brandlists:any;
  public topmodellists:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.menu.enable(true, 'loggedOutMenu');
    this.homemenus();
  }

  homemenus(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'homeSettings').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.brandlists =  this.responseData.brandList;
        this.topmodellists =  this.responseData.topmodellist;
        
      }
      else
      {
        loading.dismiss();
        this.brandlists = '';
        this.topmodellists = '';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  });

  }


//spandan end



}
