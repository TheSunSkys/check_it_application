import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';




@Component({
  selector: 'app-mystudent',
  templateUrl: './mystudent.page.html',
  styleUrls: ['./mystudent.page.scss'],
})
export class MystudentPage implements OnInit {

  searchTerm: string = '';
  searchControl: FormControl;
  items = [];
  class_id: string;
  htmlData = [];
  constructor(
    private storage: Storage,
    private router: Router,
    private postPvdr: PostProvider,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    this.searchControl = new FormControl();

  }

  ionViewDidEnter() {

  }

  async onSearchInput() {

    this.items = this.htmlData.filter((location) => {
      var a = location.p_id.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1;
      // console.log(a);
      return a;
      //  
    });
  }


  async ngOnInit() {

    let loader = await this.loadingCtrl.create({
      message: 'Loding data..',
      duration: 5000
    });
    loader.present();
    // this.storage.get("session_storage").then(async (res) => {
    //   this.username = res.username;
    //   this.status = res.status;
    //   console.log(res);
    // });
    this.storage.get("mystudent").then(async (res) => {
      // console.log(res);
      for (let index = 0; index < res.length; index++) {
        this.htmlData.push({ p_id: res[index].p_id, p_name: res[index].fullname });

      }
      loader.dismiss();

      this.items = this.htmlData;
    });

  }
  async goToStat(p_id) {
    this.storage.get("studentclass").then(async (res) => {
      // console.log(res);
      this.class_id = res;
      let body = {
        username: p_id,
        class_id: this.class_id,
        aksi: 'mydata'
      };
      // console.log(body);

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
    });


  }

}
