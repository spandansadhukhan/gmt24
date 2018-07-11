import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{Storage} from '@ionic/storage'
import {AuthServiceProvider} from '../../providers/auth-service/auth-service'
import {FormBuilder,FormControl,FormGroup,Validators,AbstractControl} from '@angular/forms'
import { IonicApp } from 'ionic-angular/components/app/app-root';
/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
  toId: any;
  fromId:any;
  productId:any;
  responseData:any;
  responseDataMsg:any;
messageDetails:any;
productName:any;
productImage:any;
formGroup:FormGroup;
dataSet:any;
txtInput:any;
userMessage:any;
textEntered:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storage: Storage,public authService:AuthServiceProvider) {

    this.toId =  this.navParams.get('to_id');
    this.fromId =  this.navParams.get('from_id');
    this.productId =  this.navParams.get('product_id');


    this.formGroup=new FormGroup ({
      message: new FormControl ('',Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');

this.dataSet=
{
  "to_id":this.toId,
  "from_id":this.fromId,
  "product_id":this.productId

};


this.authService.postData(this.dataSet,'getfullMessages').then((result) => {
  this.responseData = result
  console.log ( this.responseData)

  if( this.responseData.Ack == 1)
  {
   
    this.messageDetails =  this.responseData.fillmessage;
    console.log(this.messageDetails);
    this.productName=this.responseData.product_name
    this.productImage=this.responseData.product_image
    
    
  }
});

console.log(this.dataSet);
  }

  send(data)
  {
    console.log(data);
    console.log(data.message);
    data.to_id=this.toId
    data.from_id=this.fromId
    data.product_id=this.productId

    console.log (data)



this.authService.postData(data,'addmessage').then((result) => {

  this.responseDataMsg = result
  console.log ( this.responseDataMsg)
  console.log (data)

  if( this.responseDataMsg.Ack == 1)
  {
    this.textEntered==1;
data.message=this.txtInput
   
    console.log(this.formGroup.value.message);
    this.formGroup.value.message=this.userMessage;
    console.log (this.userMessage)
    this.formGroup.reset();
    // location.reload();



  }
});
  }

}
