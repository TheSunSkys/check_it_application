import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { TouchSequence } from 'selenium-webdriver';
import { async } from '@angular/core/testing';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private statusBar: StatusBar,
    private postPvdr: PostProvider,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private backgroundMode: BackgroundMode,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  
 
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res) => {
      if (res == null) {
        // console.log(res);
        this.router.navigate(['/login']);
      } else {
        // console.log(res);

        this.router.navigate(['/home']);
             }
    });

  }

  
}
