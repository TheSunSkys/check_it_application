import { Storage } from '@ionic/Storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  class: string;
  test: any;
  htmlData: Array<object> = []; 
  time: Array<object> = []; 
  constructor(
    private storage: Storage,
  ) { }

  ngOnInit() {

    this.storage.get("schedule").then(async (res) => {
      var text = "";
      for (let index = 0; index < res.length; index++) {
        text += '<ion-card>' +
          '<ion-item color="dark" class="activated">' +
          '<ion-icon ios="ios-clipboard" md="md-clipboard" slot="start"></ion-icon>' +
          '<ion-label >' + res[index].class_id + '</ion-label>' +
          '</ion-item>' +
          '<ion-item>' +
          ' <ion-icon ios="ios-book" md="md-book" slot="start"></ion-icon>' +
          '<ion-label>' + res[index].class_name + '</ion-label>' +
          '</ion-item>'
        // this.htmlData.push({ class_id: res[index].class_id, class_name: res[index].class_name });
        var time = res[index].class_time.split(" , ")
        // console.log(time);
        for (let i = 0; i < time.length; i++) {
          const abc = time[i].split(" ");
          // this.time.push({ day: abc[0], starttime: abc[1] , endtime: abc[3] , room: abc[4] });
          text += '<ion-item>' +
            '<ion-icon ios="ios-calendar" md="md-calendar" slot="start"></ion-icon>' +
            '<ion-card-content><ion-label>' + abc[0] + '</ion-label>' +
            '<p>' + abc[1] + " - " + abc[3] + '</p><p>' + abc[4] + '</p></ion-card-content>' +
            '</ion-item>'
        }
        text += '</ion-card>'
      }
      document.getElementById("showSchedule").innerHTML = text;
    });
  }
}
