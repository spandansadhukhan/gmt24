import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'

/**
 * Generated class for the MessageListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-listing',
  templateUrl: 'message-listing.html',
})
export class MessageListingPage {
  responseData: any;
  id: any;
  messageList: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public authService:AuthServiceProvider,
  public storage:Storage,
  public loadingCtrl: LoadingController,
  public toastCtrl:ToastController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageListingPage');
    this.messagelist();
    
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  messagelist(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.storage.get('uid').then(val => {
      this.id = val;
    let serval={
      "user_id":this.id,
     };
    this.authService.postData(serval,'listproductMessages').then((result) => {
      this.responseData = result
      console.log ( this.responseData)
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.messageList =  this.responseData.message;
        console.log(this.messageList);
        
      }else
      {
        loading.dismiss();
        this.messageList = '';
      }
     
    }, (err) => {
      loading.dismiss();
      this.presentToast('Error occured.');
      console.log(err);
     
  });
});

  }



  messageDetails(to_id,from_id,product_id)
  {
    this.navCtrl.push ('MessageDetailsPage',{'to_id':to_id,'from_id':from_id, 'product_id':product_id})
  }

}
