import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';


@Component({
  selector: 'app-myclass',
  templateUrl: './myclass.page.html',
  styleUrls: ['./myclass.page.scss'],
  // template: '<ion-header><ion-toolbar color="black"><ion-buttons slot="start"><ion-back-button color="red" defaultHref="home"></ion-back-button></ion-buttons><h1>&nbsp; MY CLASS</h1></ion-toolbar></ion-header>' +
  //   '<ion-content fullscreen>' +
  //   '<ion-list [innerTEXT]="text">' +
  //   '<ion-item lines="full" detail (click)="gotostat()">' +
  //   '<ion-label>' +
  //   '<ion-text  class="ion-text-wrap">' +
  //   '<h2>204204</h2>' +
  //   '</ion-text>' +
  //   '<ion-text >' +
  //   '<h3>ITCHES</h3>' +
  //   '</ion-text>' +
  //   '  </ion-label>' +
  //   ' </ion-item>' +
  //   '  </ion-list>' +
  //   '</ion-content>'
})
export class MyclassPage implements OnInit {
  username: string;
  htmlData = [];
  status: string;
  constructor(
    private storage: Storage,
    private router: Router,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController

  ) {

  }

  async ngOnInit() {
    let loader = await this.loadingCtrl.create({
      message: 'Loding data..',
      duration: 5000
    });
    loader.present();
    this.storage.get("session_storage").then(async (res) => {
      this.username = res.username;
      this.status = res.status;
      // console.log(res);
    });
    this.storage.get("schedule").then(async (res) => {


      for (let index = 0; index < res.length; index++) {
        this.htmlData.push({ class_id: res[index].class_id, class_name: res[index].class_name });
        // this.text += '<ion-item lines="full" id="' + res[index].class_id + '" ng-click="gotostat('+ res[index].class_id +')" detail>' +
        //   '<ion-label>' +
        //   '<ion-text  class="ion-text-wrap">' +
        //   '<h2>' + res[index].class_id + '</h2>' +
        //   '</ion-text>' +
        //   '<ion-text >' +
        //   '<h.>' + res[index].class_name + '</h.>' +
        //   '</ion-text>' +
        //   '</ion-label>' +
        //   ' </ion-item>'
      }
      loader.dismiss();
      // document.getElementById("myClass").innerHTML = this.text;
    });
    // this.htmlData = this.sanitizer.bypassSecurityTrustHtml(this.text);
  }

  async ionViewWillEnter() {

  }
  gotostat(class_id: string) {
    // console.log(class_id);
    if (this.status == "teacher") {
      this.myStudent(class_id);
    } else if (this.status == "student") {
      this.myData(class_id);
    }

    // this.router.navigate(["/datastats"]);

  }

  async myStudent(class_id) {
    let body = {
      username: this.username.toUpperCase(),
      class_id: class_id,
      aksi: 'mystudent'
    };
    
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      // console.log("HI");
      var alertpesan = data.msg;
      if (data.success) {
        this.storage.set('mystudent', data.mystudent); // create storage
        this.storage.set('studentclass', data.class_id); // create storage

        // this.storage.set('countround', data.countround); // create storage
        // this.navCtrl.pop();
        this.router.navigate(['/mystudent']);
        // console.log(data.mystudent);
      } else {
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });

  }
  async myData(class_id) {
    let body = {
      username: this.username.toUpperCase(),
      class_id: class_id,
      aksi: 'mydata'
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      var alertpesan = data.msg;
      if (data.success) {
        this.storage.set('mydata', data.mydata); // create storage
        this.storage.set('countround', data.countround); // create storage
        this.storage.set('classdetails', data.classdetails);
        // this.navCtrl.pop();

        // console.log(data.mydata);
        // console.log(data.countround);
        this.router.navigate(['/datastats']);

      } else {
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });

  }
 
}
