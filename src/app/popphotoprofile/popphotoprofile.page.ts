
import { PopoverController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { PostProvider } from '../../providers/post-provider';
import { async } from 'q';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-popphotoprofile',
  templateUrl: './popphotoprofile.page.html',
  styleUrls: ['./popphotoprofile.page.scss'],
})
export class PopphotoprofilePage implements OnInit {
  data: any;
  username: string;
  imagename: string;

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alert: AlertController
  ) { }
  myphoto: any;
  ngOnInit() {
    this.storage.get('session_storage').then((res) => {
      this.data = res;
      this.username = this.data.username;
    });
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.uploadImage();
    }, (err) => {
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.uploadImage();
    }, (err) => {
      // Handle error
    });
  }
  async delImage() {
    const alert = await this.alert.create({
      header: 'Delete ?!',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.popoverCtrl.dismiss();
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sure',
          handler: () => {
            this.popoverCtrl.dismiss();
            this.storage.set('session_storage', { "username": "B5972319", "password": "c68508c0ba52044db1c64221f1be1ca2", "fname": "CHES", "lname": "TER", "tel": "0999999999", "email": "it@g.c", "photo": "default", "status": "student" });
            let body = {
              username: this.username.toUpperCase(),
              photo: "default",
              aksi: 'changeprofile'
            };
            this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
              // console.log("Hi")
              this.router.navigate(['/home']);
              var alertpesan = data.msg;
              if (data.success) {
                const toast = await this.toastCtrl.create({
                  message: "Delete Successful!",
                  duration: 3000,
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
          }
        }
      ]
    });
    await alert.present();


  }
  async uploadImage() {

    this.popoverCtrl.dismiss();

    let loader = await this.loadingCtrl.create({
      message: 'Upload..'
    });
    loader.present();

    var d = new Date();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    var displayDate = dd + '-' + mm + '-' + yy;
    this.imagename = this.username + displayDate;
    const fileTransfer: FileTransferObject = this.transfer.create();


    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: this.imagename + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }
    let body = {
      username: this.username.toUpperCase(),
      photo: this.imagename,
      aksi: 'changeprofile'
    };
    //this.storage.set('session_storage', { "username": "B5972319", "password": "c68508c0ba52044db1c64221f1be1ca2", "fname": "CHES", "lname": "TER", "tel": "0999999999", "email": "it@g.c", "photo": this.imagename, "status": "student" });
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      // console.log("Hi")
      var alertpesan = data.msg;
      if (data.success) {
        this.storage.set('session_storage', data.result); // create storage
        fileTransfer.upload(this.myphoto, 'http://10.0.31.113/CheckIt/server_api/uploadprofile.php', options).then(async (data) => {
          // document.getElementById('tttt').innerHTML = data.response;
          // this.router.navigate(["home"])
          loader.dismiss();
          this.router.navigate(['/home']);
          const toast = await this.toastCtrl.create({
            message: "Change successful!",
            duration: 3000,
            position: 'top'
          });
          toast.present();

        }, async (err) => {
          loader.dismiss();
          const toast = await this.toastCtrl.create({
            message: "error!",
            duration: 2000,
            position: 'top'
          });
          toast.present();
        });
      } else {
        loader.dismiss();
        const toast = await this.toastCtrl.create({
          message: alertpesan,
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    });

  }
}
