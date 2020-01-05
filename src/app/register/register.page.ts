import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = "";
  password: string = "";
  cpassword: string = "";
  fname: string = "";
  lname: string = "";
  email: string = "";
  phone: string = "";
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  formLogin() {
    this.router.navigate(['/login']);
  }

  async prosesRegister() {
    if (this.username == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter Student ID!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.username.toUpperCase().indexOf('B', 0) == -1) {
      const toast = await this.toastCtrl.create({
        message: 'Invalid Student ID!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.password == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter password!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.password != this.cpassword) {
      const toast = await this.toastCtrl.create({
        message: 'Invalid password!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.fname == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter Frist Name!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.lname == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter Last Name!!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.email == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter Email!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else if (this.phone == "") {
      const toast = await this.toastCtrl.create({
        message: 'Enter Phone number!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else {
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
          aksi: 'register'
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
          var alertpesan = data.msg;
          if (data.success) {
            this.router.navigate(['/login']);
            const toast = await this.toastCtrl.create({
              message: 'Register succesful',
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

    }

  }
}
