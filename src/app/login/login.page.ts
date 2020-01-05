import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, Platform, IonRouterOutlet, LoadingController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  generic: any;
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private platform: Platform,
    private loadingCtrl: LoadingController
  ) {

    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/login') {
        navigator['app'].exitApp();
      } else {
        this.generic.showAlert("Exit", "Do you want to exit the app?", "backPress");
      }
    }); 
    platform.ready().then((readySource) => {
      let body = platform.width()
      // console.log(body)
      document.getElementById("logo").style.width = (body * 0.5) + "px";
    });
  }

  ngOnInit() {
  }



  formRegister() {
    this.router.navigate(['/register']);
  }

  async prosesLogin() {
    // let user = {
    //   username: 'B5972319',
    //   password: '',
    //   fname: 'It',
    //   lname: 'Ches',
    //   tel: '0999999999',
    //   email: 'itches25@gmail.com',
    //   photo: 'Default',
    //   status: 'master'
    // };
    // this.storage.set('session_storage', user);
    let loader = await this.loadingCtrl.create({
      message: 'Login..',
      duration: 3000
    });
    loader.present();
    if (typeof this.username != 'undefined' && typeof this.password != 'undefined') {
      var user = this.username.toUpperCase();
      let body = {
        username: user,
        password: this.password,
        aksi: 'login'
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.storage.set('session_storage', data.result); // create storage
          this.router.navigate(['/home']);
          loader.dismiss();
        } else {
          loader.dismiss();
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });
    } else {
      loader.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'ID or Password invalid!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }

  }
}
