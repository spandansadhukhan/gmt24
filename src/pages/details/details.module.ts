import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPage } from './details';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    DetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
    IonicImageViewerModule
  ],
})
export class DetailsPageModule {}
