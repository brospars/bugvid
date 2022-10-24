import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {VideoPlayerComponent} from './video-player/video-player.component';

import {File} from '@awesome-cordova-plugins/file/ngx';
import {FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, VideoPlayerComponent],
  providers: [
    File,
    FileTransfer
  ]
})
export class HomePageModule {}
