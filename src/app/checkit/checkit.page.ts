import { ModalPagePage } from './../modal-page/modal-page.page';
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { async } from 'q';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';



@Component({
  selector: 'app-checkit',
  templateUrl: './checkit.page.html',
  styleUrls: ['./checkit.page.scss'],
})
export class CheckitPage implements OnInit {
  username: string;
  data: any;
  locate: any;
  currentImage: any;
  class_id: number;
  checkimg: boolean = false;
  checklocate: boolean = false;
  imagename: string;
  round_id: number;
  body: number;
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {
    platform.ready().then((readySource) => {
      this.body = platform.width()

      // console.log('Width: ' + platform.width());
      // console.log('Height: ' + platform.height());
    });
  }

  ionViewWillEnter() {

    var Url = document.getElementById("takephoto") as HTMLImageElement;
    Url.style.width = (this.body * 0.6) + "px";
    Url.style.height = (this.body * 0.75) + "px";
    // this.currentImage = "./assets/img/takephoto.png";
    Url.src = "./assets/img/takephoto.png";


    this.storage.get('session_storage').then((res) => {
      this.data = res;
      this.username = this.data.username;
    });
    this.storage.get('class_id').then(async (res) => {
      this.class_id = res.class_id;
      this.round_id = res.class_id + res.round_id;
      this.imagename = this.round_id.toString();
      // console.log(this.imagename);
      // const toast = await this.toastCtrl.create({
      //   message: this.class_id.toString(),
      //   duration: 2000
      // });
      // toast.present();
    });
    // document.getElementById("takephoto").style.display = "none";
    document.getElementById("yourlocate").style.display = "none";

    // let wbody = Number(document.getElementById("body").offsetWidth);
    // // (wbody * 0.8) + 
    // document.getElementById("img").style.width = "600px";
    // document.getElementById("img").style.height = "600px";
  }
  opencamera() {
    var Url = document.getElementById("takephoto") as HTMLImageElement;
    // Url.src = 'http://172.20.10.2/CheckIt/server_api/Image/Profile/B5972319/B5972319myprofile9919.jpg';

    // this.currentImage = 'http://172.20.10.2/CheckIt/server_api/Image/Profile/B5972319/B5972319myprofile9919.jpg';


    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      cameraDirection: this.camera.Direction.FRONT,

    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      Url.src = 'data:image/jpeg;base64,' + imageData;
      this.checkimg = true;
      // document.getElementById("takephoto").style.display = "block";
      // document.getElementById("default").style.display = "none";
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
  async getLocation() {
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      componentProps: { locate: this.locate },
    });
    modal.onDidDismiss()
      .then(async (data) => {
        this.storage.get('locate').then(async (res) => {
          if (res != null) {
            this.locate = JSON.parse(res);
            this.checklocate = true;
            document.getElementById("yourlocate").style.display = "block";
            document.getElementById("address").innerHTML = this.locate.address;
          }
        });

      });
    return await modal.present();
  }
  async checkkkkk() {

    if (this.checkimg && this.checklocate) {
      this.upload();
    } else {
      if (this.checkimg) {
        const toast = await this.toastCtrl.create({
          message: "Please check your location!",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else if (this.checklocate) {
        const toast = await this.toastCtrl.create({
          message: "Please take a photo!",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: "Do something!!!!",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
    }

  }
  ngOnInit() {
  }
  upload() {
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
      class_id: this.class_id,
      class_round_id: this.round_id,
      student_photo: this.imagename,
      class_pos_lat: this.locate.lat,
      class_pos_long: this.locate.lng,
      check_address: this.locate.address,
      aksi: 'checkkkkk'
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
      // console.log("Hi")
      var alertpesan = data.msg;
      if (data.success) {
        fileTransfer.upload(this.currentImage, 'http://10.0.31.113/CheckIt/server_api/upload.php', options).then(async (data) => {
          // document.getElementById('tttt').innerHTML = data.response;
          this.router.navigate(["/home"])
          const toast = await this.toastCtrl.create({
            message: "Check successful!",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }, async (err) => {
          const toast = await this.toastCtrl.create({
            message: "error!",
            duration: 2000,
            position: 'top'
          });
          toast.present();
        });

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
