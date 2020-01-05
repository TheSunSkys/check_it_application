import { PostProvider } from './../../providers/post-provider';
import { Storage } from '@ionic/Storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { async } from 'q';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datastats',
  templateUrl: './datastats.page.html',
  styleUrls: ['./datastats.page.scss'],
})
export class DatastatsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  barChart: any;
  doughnutChart: any;
  lineChart: any;
  class: string;
  class_name: string;
  countmydata: number;
  countround: number;
  persent: string;
  status: string;
  text: string;
  items = [];
  body: number;
  all: number = 0;
  p_id: any;
  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
    private postPvdr: PostProvider,
    private router: Router,
    private toastCtrl: ToastController

  ) {
    platform.ready().then((readySource) => {
      this.body = platform.height()

      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
    });
    // this.items = [
    //   "a","a","a","a","a","a","a","a","a","a","a","a","a","a"
    // ]

  
    
  }

  async ngOnInit() {
    // this.items = [];
    // console.log(this.items)
    document.getElementById('con').style.height = (this.body * 0.30) + "px";
    this.storage.get("session_storage").then(async (res) => {
      this.status = res.status;
      
    });
    this.storage.get('classdetails').then(async (res) => {
      // console.log(res);
      this.p_id = res.p_id;
      this.class = res.class_id;
      this.class_name = res.class_name;
    });
    this.storage.get("countround").then(async (res1) => {
      this.storage.get("mydata").then(async (res) => {

        if (res1.length != 0) {
          for (let index = 0; index < res1.length; index++) {
            let date = new Date(res1[index].class_date_check);
            var day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var month_names = ["January", "February", "March",
              "April", "May", "June",
              "July", "August", "September",
              "October", "November", "December"];
            var day_index = date.getDay();
            var month_index = date.getMonth();
            var setdate = day_names[day_index] + " " + date.getDate() + " " + month_names[month_index] + " " + date.getFullYear();
            this.all += ((res[index].countofdate / res1[index].countofdate) * 100);
            this.items.push({ puredate: res1[index].class_date_check, class_date_check: setdate, allcheck: res1[index].countofdate, mycheck: res[index].countofdate, persent: ((res[index].countofdate / res1[index].countofdate) * 100).toFixed(2) });
          }
        }

        // console.log(res);

        this.persent = (this.all / res1.length).toFixed(2);
        this.countmydata = Number(this.persent);
        this.countround = 100;
        this.doughnutChartMethod();
        if (Number(this.persent) < 80) {
          document.getElementById("colorcheck").style.color = "red";
        } else if (Number(this.persent) >= 80) {
          document.getElementById("colorcheck").style.color = "limegreen";
        } else {
          this.persent = "0.0";
          document.getElementById("colorcheck").style.color = "red";
        }
      });
    });



    // this.barChartMethod();

    // this.lineChartMethod();
  }
  detailcheck(date, class_id) {
    // console.log(date + " " + class_id)

    let body = {
      username: this.p_id,
      class_id: class_id,
      date: date,
      aksi: 'detaildate'
    };
    // console.log(body);

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      var alertpesan = data.msg;
      if (data.success) {
        this.storage.set('detaildate', data.detaildate); // create storage
        // console.log(data.detaildate);
       
        this.router.navigate(['/datedetail']);
        

      } else {
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }
  // barChartMethod() {
  //   this.barChart = new Chart(this.barCanvas.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [200, 50, 30, 15, 20, 34],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255,99,132,1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }]
  //       }
  //     }
  //   });
  // }

  doughnutChartMethod() {

    if (this.status == 'student') {
      this.text = 'Your';
    } else {
      this.text = 'Student'
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [this.text + ' check', this.text + ' not check'],
        datasets: [{
          label: 'Checkkkkk',
          data: [this.countmydata, this.countround - this.countmydata],
          backgroundColor: [
            '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
            '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
          ],
          hoverBackgroundColor: [
            '#FF0000',
            '#000000'
          ]
        }]
      },

    });
    // console.log(this.doughnutChart);
  }

  // lineChartMethod() {
  //   this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  //     type: 'line',
  //     data: {
  //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
  //       datasets: [
  //         {
  //           label: 'Sell per week',
  //           fill: false,
  //           lineTension: 0.1,
  //           backgroundColor: 'rgba(75,192,192,0.4)',
  //           borderColor: 'rgba(75,192,192,1)',
  //           borderCapStyle: 'butt',
  //           borderDash: [],
  //           borderDashOffset: 0.0,
  //           borderJoinStyle: 'miter',
  //           pointBorderColor: 'rgba(75,192,192,1)',
  //           pointBackgroundColor: '#fff',
  //           pointBorderWidth: 1,
  //           pointHoverRadius: 5,
  //           pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //           pointHoverBorderColor: 'rgba(220,220,220,1)',
  //           pointHoverBorderWidth: 2,
  //           pointRadius: 1,
  //           pointHitRadius: 10,
  //           data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
  //           spanGaps: false,
  //         }
  //       ]
  //     }
  //   });
  // }

}
