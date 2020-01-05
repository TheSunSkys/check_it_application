import { Platform, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { Component, OnInit } from '@angular/core';
import { async } from 'q';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datedetail',
  templateUrl: './datedetail.page.html',
  styleUrls: ['./datedetail.page.scss'],
})
export class DatedetailPage implements OnInit {
  date: string;
  body: number;
  loading: any;
  items = [];
  nameimg = [];
  class_id:String;
  p_id: String;
  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private loadingController: LoadingController
  ) {
    platform.ready().then((readySource) => {
      this.body = platform.width()

      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
    });
    this.items = [];
    this.storage.get("detaildate").then( (res) => {
     // console.log(this.body);
     let date = new Date(res[0].class_date_check);
     this.class_id = res[0].class_id;
     this.p_id = res[0].p_id;
     var day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     var month_names = ["January", "February", "March",
       "April", "May", "June",
       "July", "August", "September",
       "October", "November", "December"];
     var day_index = date.getDay();
     var month_index = date.getMonth();
     this.date = day_names[day_index] + " " + date.getDate() + " " + month_names[month_index] + " " + date.getFullYear();
     for (let index = 0; index < res.length; index++) {
       this.items.push({ class_id: res[index].class_id, time: res[index].class_time_check, address: res[index].check_address, photo: res[index].student_photo, id: res[index].p_id, lat: res[index].class_pos_lat, lng: res[index].class_pos_long });
       this.nameimg.push(res[index].student_photo);
       // document.getElementById(res[index].student_photo).style.width = (this.body * 0.6) + "px";
       // document.getElementById(res[index].student_photo).style.height = (this.body * 0.75) + "px";
     }
   });
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await this.loading.present();
  }

  ionViewDidEnter(){
    
    
   for (let i = 0; i < this.nameimg.length; i++) {
    // console.log(this.nameimg.length)
    // console.log(this.nameimg[i]);
    var Url = document.getElementById(this.nameimg[i]) as HTMLImageElement;
    Url.src = 'http://10.0.31.113/CheckIt/server_api/Image/ClassCheck/' + this.class_id + '/'+ this.p_id  +'/' + this.nameimg[i] + '.jpg';
    Url.style.height = (this.body * 0.75) + "px";
    Url.style.width = (this.body * 0.6) + "px";
    }
    this.loading.dismiss();
  }
  
  getMap(lat, lng) {
    // console.log(lat+","+lng);
    this.storage.set("getmap", ({ 'lat': lat, 'lng': lng }))
    this.router.navigate(['/getmap']);
  }
}
