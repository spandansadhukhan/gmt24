import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  public show:boolean = false;
  public movementshow:boolean = false;
  public sellershow:boolean = false;
  public statusshow:boolean = false;
  minValue: any;
  minSize: any = { lower: 0, upper: 100 };
  limit:any=5;
  responseData:any;
  brandlists:any;
  answers=[];
  answers1=[];
  answers2=[];
  answers3=[];
  answers4=[];
  brandid:any;
  subcategorylist=[];
  countrylists:any;
  statelists:any;
  braceletlists:any;
  years:any;
  movementlists:any;
  statuslists:any;
  shopOwners:any;
  minprice:any;
  maxprice:any;
  min:any;
  max:any;
  catid:any;
  movementid:any;
  sellerid:any;
  statusid:any;
  minslidevalue:any;
  maxslidevalue:any;
  braceletid:any;
  minslidesize:any;
  maxslidesize:any;
  stateid:any;
  genderid:any;
  yearid:any;
  searchdata:any;
  countryid:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl: LoadingController,
     public authService: AuthServiceProvider,) {
      
      this.min=this.navParams.get("min");
      this.max=this.navParams.get("max");
      this.minValue= { lower: this.min, upper: this.max };
      //alert(this.minValue.lower);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
    this.brandList();
    this.countryList();
    this.braceletlist();
    this.yearlist();
    this.movementlist();
    this.statuslist();
    this.sellerlist();
    this.maxminpriceList();
  }


  


  toggle() {

    this.show = !this.show;
  }

  toggle1() {

    this.movementshow = !this.movementshow;
  }
  toggle2() {

    this.sellershow = !this.sellershow;
  }

  toggle3() {

    this.statusshow = !this.statusshow;

  }
  brandList(){

    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
   
    let serval={
      
    }
    
    this.authService.postData(serval,'listbrand').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        loading.dismiss();
        this.brandlists =  this.responseData.brandlist;
         //console.log('arunava',this.productlists)
      }
      else
      {
        loading.dismiss();
        this.brandlists = '';
        //this.msg =this.responseData.msg; 
      }
     
    }, (err) => {
      loading.dismiss();
      console.log(err);
      
    });
  
}

onstateset(id){

  if(id){
    this.stateid = id;
  }else{
    this.stateid = "";
  }
  
}
ongenderset(id){

  if(id){
    this.genderid = id;
  }else{
    this.genderid = "";
  }
  
}
onbraceletset(id){

  if(id){
    this.braceletid = id;
  }else{
    this.braceletid = "";
  }
  
}
onyearset(id){

  if(id){
    this.yearid = id;
  }else{
    this.yearid = "";
  }
  
}

priceslider(id){

  if(id){
  this.min=id.value.lower;
  this.max=id.value.upper;
  //console.log('price',id.value.lower);
  }
}

onsizeslider(id){

  this.minslidesize=id.value.lower;
  this.maxslidesize=id.value.upper;
  
}


onChange(id, isChecked, index) {
  // nested formarray, which is inside nested formgroup, inside outer array
  //const answers = <FormArray>this.surveyForm.controls.questions.controls[index].controls.answer_ids

 if(isChecked) {
    this.answers.push(id)
   // console.log('sparray',this.answers);
 } else {
    let idx = this.answers.indexOf(id)
    this.answers.splice(idx,1);
    //console.log('sparray',this.answers);
 }
       this.brandid= this.answers.toString();

       let serval={
      "cat_id":this.brandid
      }
      
      this.authService.postData(serval,'listSubcategorysearch').then((result) => {
        this.responseData = result
   
        if( this.responseData.Ack == 1)
        {
         
          this.subcategorylist =  this.responseData.subcategorylist;
        }
        else
        {
          
          this.subcategorylist = [];
        }
       
      }, (err) => {
       
        console.log(err);
        
      });
  }


  onCatisset(id, isChecked, index) {
   
   if(isChecked) {
      this.answers1.push(id)
      //console.log('sparray',this.answers1);
   } else {
      let idx = this.answers1.indexOf(id)
      this.answers1.splice(idx,1);
      //console.log('sparray',this.answers1);
   }
         this.catid= this.answers1.toString();
         //console.log('catarray',this.catid);
    }


    onmovementset(id, isChecked, index) {
   
      if(isChecked) {
         this.answers2.push(id)
         //console.log('sparray',this.answers1);
      } else {
         let idx = this.answers2.indexOf(id)
         this.answers2.splice(idx,1);
         //console.log('sparray',this.answers1);
      }
            this.movementid= this.answers2.toString();
            //console.log('catarray',this.movementid);
       }

       onsellerset(id, isChecked, index) {
   
        if(isChecked) {
           this.answers3.push(id)
           //console.log('sparray',this.answers1);
        } else {
           let idx = this.answers3.indexOf(id)
           this.answers3.splice(idx,1);
           //console.log('sparray',this.answers1);
        }
              this.sellerid= this.answers3.toString();
             // console.log('catarray',this.sellerid);
         }


         onstatusset(id, isChecked, index) {
   
          if(isChecked) {
             this.answers4.push(id)
             //console.log('sparray',this.answers1);
          } else {
             let idx = this.answers4.indexOf(id)
             this.answers4.splice(idx,1);
             //console.log('sparray',this.answers1);
          }
                this.statusid= this.answers4.toString();
                //console.log('catarray',this.statusid);
           }

  countryList(){

    let serval={
      
    }
    this.authService.postData(serval,'listcountry').then((result) => {
      this.responseData = result
 
      if( this.responseData.Ack == 1)
      {
        this.countrylists =  this.responseData.countrylist;
      }
      else
      {
        this.countrylists = '';
      }
     
    }, (err) => {
      console.log(err);
    });
  
}


liststate(cid){

  this.countryid=cid;
  this.authService.satelist({"c_id": cid}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.statelists=res.statelist;
    }else{
      this.statelists="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}

braceletlist(){

  this.authService.braceletlist({}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.braceletlists=res.braceletlist;
    }else{
      this.braceletlists="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}


yearlist(){

  this.authService.yearlist({}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.years=res.Years;
    }else{
      this.years="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}


movementlist(){

  this.authService.movementlist({}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.movementlists=res.movementlist;
    }else{
      this.movementlists="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}

statuslist(){

  this.authService.statuslist({}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.statuslists=res.statuslist;
    }else{
      this.statuslists="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}

sellerlist(){

  this.authService.sellerlist({}).subscribe(res=>{
    if(res.Ack==1){
     
     //console.log(res.countrylist);
    this.shopOwners=res.shopOwners;
    }else{
      this.shopOwners="";
    }
   },err=>{
     
    //console.log(err);
     
  });

}


maxminpriceList(){

  let serval={
    "type":1,
  }
  
  this.authService.postData(serval,'getmaxprice').then((result) => {
    this.responseData = result

    if( this.responseData.Ack == 1)
    {
      
      this.minprice=this.responseData.minprice;
      this.maxprice=this.responseData.maxprice;
    }
    else
    {
      this.minprice= 0;
      this.maxprice= 10000;
    }
   
  }, (err) => {
    
    console.log(err);
    
  });

}

onSave(){

this.searchdata=JSON.stringify({"brand":this.brandid,"catid":this.catid,"movementid":this.movementid,"sellerid":this.sellerid,"statusid":this.statusid,
"minprice":this.min,"maxprice":this.max,"braceletid":this.braceletid,"minslidesize":this.minslidesize,"maxslidesize":this.maxslidesize,"stateid":this.stateid,"genderid":this.genderid,"yearid":this.yearid,"countryid":this.countryid});

//console.log('searchdata',this.searchdata);
this.navCtrl.push('SearchPage',{"param":this.searchdata});

}


}
