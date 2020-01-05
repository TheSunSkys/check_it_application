import { Storage } from '@ionic/Storage';
import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-provider';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
  ) { }
  username: string;
  data: any;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  password: string;
  cpassword: string;
  ngOnInit() {
    this.storage.get('session_storage').then(async (res) => {
      this.data = res;
      this.username = this.data.username;
      this.fname = this.data.fname;
      this.lname = this.data.lname;
      this.phone = this.data.tel;
      this.email = this.data.email;
    });
  }
  cancel() {
    this.modalCtrl.dismiss();
  }
  async save() {
    if (typeof this.password == 'undefined' && typeof this.password == 'undefined') {
      var a = Number(this.phone);
      var b = this.phone.length;
      if (a > 0 && b == 10) {
        let body = {
          username: this.username.toUpperCase(),
          fname: this.fname.toUpperCase(),
          lname: this.lname.toUpperCase(),
          email: this.email,
          phone: this.phone,
          aksi: 'edit'
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
          var alertpesan = data.msg;
          if (data.success) {
            this.storage.set('session_storage', data.result); // create storage
            this.modalCtrl.dismiss();
            this.router.navigate(['/myprofile']);
            const toast = await this.toastCtrl.create({
              message: "Edit successful",
              duration: 2000,
              position: 'top'
            });
            toast.present();
          } else {
            const toast = await this.toastCtrl.create({
              message: alertpesan,
              duration: 2000,
              position: 'top'
            });
            toast.present();
          }
        });
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Invalid Phone number!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    } else {
      if (this.password == this.cpassword) {
        var a = Number(this.phone);
        var b = this.phone.length;
        if (a > 0 && b == 10) {

          let body = {
            username: this.username.toUpperCase(),
            password: this.password,
            fname: this.fname.toUpperCase(),
            lname: this.lname.toUpperCase(),
            email: this.email,
            phone: this.phone,
            aksi: 'edit'
          };
          this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
            var alertpesan = data.msg;
            if (data.success) {
              this.storage.set('session_storage', data.result); // create storage
              this.modalCtrl.dismiss();
              this.router.navigate(['/myprofile']);
              const toast = await this.toastCtrl.create({
                message: "Edit successful",
                duration: 2000,
                position: 'top'
              });
              toast.present();
            } else {
              const toast = await this.toastCtrl.create({
                message: alertpesan,
                duration: 2000,
                position: 'top'
              });
              toast.present();
            }
          });
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Invalid Phone number!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Invalid password!',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    }
  }
}
