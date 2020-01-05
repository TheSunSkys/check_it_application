// import { PopphotoprofilePage } from './../popphotoprofile/popphotoprofile.page';
import { EditprofilePage } from './../editprofile/editprofile.page';
import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, ModalController, LoadingController, Platform, ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { async } from 'q';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  username: string;
  data: any;
  name: string;
  status: string;
  img: string;
  tel: string;
  email: string;
  test: string;
  body: number;
  myphoto: any;
  imagename: string;
  constructor(

    private toastCtrl: ToastController,
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    // private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private alert: AlertController,
    private navCtrl: NavController
  ) {
    platform.ready().then((readySource) => {
      this.body = platform.width()

      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
    });
  }
  async ngOnInit() { }
  async ionViewWillEnter() {
    this.load(this.body);
  }
  async load(body) {
    var Url = document.getElementById("itches") as HTMLImageElement;

    //  this.storage.set('session_storage', {"username":"B5972319","password":"c68508c0ba52044db1c64221f1be1ca2","fname":"CHES","lname":"TER","tel":"0999999999","email":"it@g.c","photo":"B5972319myprofile9919","status":"student"});

    this.storage.get('session_storage').then(async (res) => {
      this.data = await res;
      this.img = this.data.photo;
      this.username = this.data.username;
      if (this.img === "default" || this.img === "Default") {
        Url.style.width = (body * 0.5) + "px";
        Url.style.height = (body * 0.5) + "px";
        Url.src = "./assets/img/default.png";
      } else {
        Url.style.width = (body * 0.5) + "px";
        Url.style.height = (body * 0.5) + "px";
        Url.src = 'http://10.0.31.113/CheckIt/server_api/Image/Profile/' + this.username + '/' + this.img + '.jpg';
      }
      this.status = this.data.status.toUpperCase();
      this.name = this.data.fname + " " + this.data.lname;
      this.tel = this.data.tel;
      this.email = this.data.email;

    });
  }

  // async presentPopover() {
  //   const popover = await this.popoverCtrl.create({
  //     component: PopphotoprofilePage,
  //     event
  //   });
  //   popover.style.cssText = '--width: 200px; --height:auto;';
  //   return await popover.present();
  // }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile photo',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          const alert = await this.alert.create({
            header: 'Delete ?!',
            message: 'Are you sure you want to delete?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  // this.popoverCtrl.dismiss();
                  // console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Sure',
                handler: () => {
                  // this.popoverCtrl.dismiss();
                  this.storage.get('session_storage').then(async (res) => {
                  this.storage.set('session_storage', { "username": res.username, "password": res.password, "fname": res.fname, "lname": res.lname, "tel": res.tel, "email": res.email, "photo": "default", "status": res.status });
                  let body = {
                    username: this.username.toUpperCase(),
                    photo: "default",
                    aksi: 'changeprofile'
                  };
                  this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
                    // console.log("Hi")
                    // this.router.navigate(['/home']);
                    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    // this.navCtrl.navigateRoot(this.navCtrl.getActive().component);
                    this.load(this.body);
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
                });
                }
              }
            ]
          });
          await alert.present();
          console.log('Delete clicked');
        }
      }, {
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: true,
            saveToPhotoAlbum: true,
            cameraDirection: this.camera.Direction.FRONT,

          }

          this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.myphoto = 'data:image/jpeg;base64,' + imageData;
            this.uploadImage();
          }, (err) => {
            // Handle error
          });
          console.log('Camera clicked');
        }
      }, {
        text: 'Gallery',
        icon: 'images',
        handler: () => {
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
          console.log('Gallery clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async uploadImage() {

    // this.popoverCtrl.dismiss();

    let loader = await this.loadingCtrl.create({
      message: 'Upload..'
    });
    loader.present();

    var d = new Date();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yy = d.getFullYear();
    var displayDate = dd + '-' + mm + '-' + yy;
    var length = 8;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.imagename = this.username + result + "DATE" + displayDate;
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
          // this.router.navigate(['/home']);
          this.load(this.body);
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

  async edit() {
    const modal = await this.modalCtrl.create({
      component: EditprofilePage,
      componentProps: {},
    });
    modal.onDidDismiss()
      .then(async (data) => {

        this.load(this.body);
      });
    return await modal.present();

  }
}
