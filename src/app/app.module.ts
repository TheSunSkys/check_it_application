import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { PostProvider } from '../providers/post-provider';
import { IonicStorageModule } from '@ionic/Storage';
import { Camera } from '@ionic-native/camera/ngx';  
import { FormsModule } from '@angular/forms';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { PopphotoprofilePageModule } from './popphotoprofile/popphotoprofile.module';
import { EditprofilePageModule } from './editprofile/editprofile.module';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	HttpModule,
    IonicStorageModule.forRoot(), 
  	IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    EditprofilePageModule,
    PopphotoprofilePageModule
    
  	],
  providers: [
    StatusBar,
    PostProvider,
    SplashScreen,
    BarcodeScanner,
    Camera,
    FileTransfer,
    File,
    Geolocation,
    NativeGeocoder,
    LocalNotifications,
    BackgroundMode,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
