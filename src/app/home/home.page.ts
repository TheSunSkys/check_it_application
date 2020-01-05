
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Component, OnInit } from '@angular/core';
import { ToastController, Platform, AlertController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { TouchSequence } from 'selenium-webdriver';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import $ from "jquery";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  data: any;
  name: string;
  status: string;
  img: string;
  scannedData: {};
  text: string;
  barcodeScannerOptions: BarcodeScannerOptions;
  body: Number;
  tt: Number;
  all: number = 0;
  persent: string;
  password: string;
  mydata = [];
  countround = [];
  schedule = [];
  interval: any;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private alert: AlertController,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private iab: InAppBrowser,
  ) {

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
    this.platform.ready().then(() => {
      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.alertCtrl.create({
          header: res.title,
          subHeader: res.text,
          message: msg,
          buttons: ['OK'],

          // duration: 3000
        }).then(alert => alert.present());
      });
    });
    platform.ready().then((readySource) => {
      this.body = platform.height()
      this.tt = platform.width()

      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
    });
    // document.addEventListener('pause', this.callfunction, false);

  }

  // callfunction() {
  //   $('#abcde').text("12345");
  // }
  async ionViewWillEnter() {
    this.load(this.body, this.tt);

  }
  async load(body, test) {
    var Url = document.getElementById("myProfile") as HTMLInputElement;
    this.storage.get('session_storage').then((res) => {
      this.data = res;
      this.username = this.data.username;
      this.status = this.data.status.toUpperCase();
      this.name = this.data.fname + " " + this.data.lname;
      this.img = this.data.photo;
      if (this.img === "default" || this.img === "Default") {
        Url.src = './assets/img/default.png';
      } else {
        Url.src = 'http://10.0.31.113/CheckIt/server_api/Image/Profile/' + this.username + '/' + this.img + '.jpg';
      }
      if (res.status.toUpperCase() != "STUDENT") {

      } else {
        this.checknoti();
        // this.interval = setInterval(function () {

        //   // console.log("Hi")
        // }.bind(this), 1000);

      }

    });

    // let test = Number(document.getElementById("header").offsetWidth);

    document.getElementById("profile").style.width = (test / 5) + "px";
    document.getElementById("profile").style.height = (test / 5) + "px";

    document.getElementById("qr").style.width = "100%";
    document.getElementById("qr").style.height = ((body * 0.75) / 3) + "px";

    document.getElementById("data").style.width = "100%";
    document.getElementById("data").style.height = ((body * 0.75) / 3) + "px";

    document.getElementById("table").style.width = "100%";
    document.getElementById("table").style.height = ((body * 0.75) / 3) + "px";

    document.getElementById("pro").style.width = "100%";
    document.getElementById("pro").style.height = ((body * 0.75) / 3) + "px";

    document.getElementById("setting").style.width = "100%";
    document.getElementById("setting").style.height = ((body * 0.75) / 3) + "px";

    document.getElementById("logout").style.width = "100%";
    document.getElementById("logout").style.height = ((body * 0.75) / 3) + "px";


    // document.getElementById("imgqr").style.height = "90%";
    // document.getElementById("logout").style.height = ((body*0.75)/ 3) + "px";
    // const toast = await this.toastCtrl.create({
    //   message: 'hi',
    //   duration: 2000
    // });
    // toast.present();
  }
  checknoti() {
    // throw new Error("Method not implemented.");
    // this.backgroundMode.enable();
    let body = {
      username: this.username.toUpperCase(),
      status: this.status.toUpperCase(),
      aksi: 'checkshcedule'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      if (data.success) {
        this.storage.set('schedule', data.schedule);
        this.schedule = data.schedule;
        // var date = new Date();


        var day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // console.log(res1);
        for (let index = 0; index < this.schedule.length; index++) {
          let body = {
            username: this.username.toUpperCase(),
            class_id: this.schedule[index].class_id,
            aksi: 'mydata'
          };
          this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
            if (data.success) {
              this.all = 0;
              this.countround = data.countround;
              this.mydata = data.mydata;
              // console.log(this.schedule[index].class_id);
              // console.log(this.countround);
              // console.log(this.mydata);
              // this.storage.get("countround").then( async(cres) => {
              //   this.storage.get("mydata").then((mres) => {
              //     console.log(res1[index].class_id + "aadsfasd");
              //     console.log(cres);
              //     console.log(mres);
              for (let i = 0; i < this.countround.length; i++) {
                this.all += ((this.mydata[i].countofdate / this.countround[i].countofdate) * 100);
              }
              this.persent = (this.all / this.countround.length).toFixed(2);

              //   });


              var time = this.schedule[index].class_time.split(" , ")
              // console.log(this.persent);
              for (let i = 0; i < time.length; i++) {
                const abc = time[i].split(" ");
                for (let ii = 0; ii < 5; ii++) {
                  var date = new Date();
                  date.setDate(date.getDate() + ii);
                  if (abc[0] == day_names[date.getDay()]) {
                    // console.log((date.getHours()+1)+":"+date.getMinutes());
                    // console.log(abc[1]);
                    // var xx = (date.getHours() + 1) + ":" + date.getMinutes();
                    // if (abc[1] == xx) {
                    var hm = abc[1].split(":");
                    // console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), (Number(hm[0]) - 1), Number(hm[1])) );
                    // console.log(date);
                    this.noti(this.schedule[index].class_id, this.schedule[index].class_name, abc, date, hm);
                    // }
                  }
                }
              }
              // });
            }
          });


        }

      }
    });


    // console.log(day_names[date.getDay()]);

  }

  noti(class_id, class_name, abc, date, hm) {
    // console.log(class_id + date.getDate());
    // console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate(), (Number(hm[0]) - 1), Number(hm[1])));
    this.localNotifications.schedule({
      id: class_id + date.getDate(),
      title: class_id + " " + class_name,
      text: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' Have Class: ' + abc[1] + ' Room: ' + abc[4] + 'You have check ' + this.persent + ' %',
      data: { mydata: 'You have check ' + this.persent + ' %' },
      trigger: { at: new Date(date.getFullYear(), date.getMonth(), date.getDate(), (Number(hm[0]) - 1), Number(hm[1])) },
      // trigger: { at: new Date(new Date().getTime()+1000) },
      // led: 'FF0000'

    });
  }

  async dataInfo() {
    this.test("dataInfo");

    // const toast = await this.toastCtrl.create({
    //   message: 'Coming soon. :)',
    //   duration: 2000,
    //   position: 'top'
    // });
    // toast.present();
  }
  tableSchedule() {

    this.test("tableSchedule");
    // const toast = await this.toastCtrl.create({
    //   message: 'Coming soon. :)',
    //   duration: 2000,
    //   position: 'top'
    // });
    // toast.present();
  }

  test(page) {
    let body = {
      username: this.username.toUpperCase(),
      status: this.status.toUpperCase(),
      aksi: 'checkshcedule'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      if (data.success) {
        this.storage.set('schedule', data.schedule);
        if (page == "tableSchedule") {
          this.router.navigate(['/schedule']);
        } else {
          this.router.navigate(['/myclass']);
        }
      }
    });
  }

  async myProfile() {

    this.router.navigate(['/myprofile']);
    // const toast = await this.toastCtrl.create({
    //   message: 'Coming soon. :)',
    //   duration: 2000,
    //   position: 'top'
    // });
    // toast.present();
  }
  async settings() {
    const toast = await this.toastCtrl.create({
      message: 'All setting is the Best Bro!',
      duration: 2000,
      position: 'top'
    });
    // toast.present();
    // let body = {
    //   test: 'aabbcc'
    // }
    // this.postPvdr.postData(body, '').subscribe(data => {
      
    // }, error => {
    //   alert(error);
    // }
    // )

  }

  scanCode() {
    // this.router.navigate(['/checkit']);
    this.scanqr();
    if (this.status != "STUDENT") {
      // window.open("http://172.20.10.2:8080");
      // const browser = this.iab.create();
      let target = "_blank";
      this.iab.create("http://10.0.31.113:8080", '_self', this.options);
    } else {
      this.barcodeScanner
        .scan()
        .then(barcodeData => {
          // alert("Barcode data " + JSON.stringify(barcodeData));
          // this.scannedData = barcodeData.text.toString();
          this.text = barcodeData.text.toString();
          // alert(barcodeData.text);
          if (barcodeData.cancelled) {
            this.router.navigate(['/home']);
          } else {
            this.scanqr();
          }
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
  }

  async scanqr() {
    // this.router.navigate(['/checkit']);
    let body = {
      username: this.username.toUpperCase(),
      qrcode: this.text,
      status: this.status,
      aksi: 'scan'
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      // console.log("Hi")
      var alertpesan = data.msg;
      if (data.success) {
        this.storage.set('class_id', data.class_id); // create storage
        this.router.navigate(['/checkit']);
        // const toast = await this.toastCtrl.create({
        //   message: alertpesan,
        //   duration: 3000
        // });
        // toast.present();
        console.log('sssssssssssssss')
      } else {
        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn')
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

  async prosesLogout() {


    const alert = await this.alert.create({
      header: 'Log out ?!',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sure',
          handler: () => {
            clearInterval(this.interval);
            this.storage.clear();
            this.localNotifications.clearAll();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();

  }

}
