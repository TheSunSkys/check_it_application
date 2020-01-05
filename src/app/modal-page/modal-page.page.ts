import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/Storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {


  @ViewChild('map')
  mapElement: ElementRef;
  map: any;
  address: string;
  locate: string;
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private storage: Storage,
    public modalCtrl: ModalController) { }
  ngOnInit() {

  }
  ionViewWillEnter() {
    // this.setLocation();
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        zoomControl:false,
        streetViewControl: false
      }
      
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      })
      this.map.addListener('tilesloaded', () => {
        // console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      // console.log('Error getting location', error);
    });
  }
  setLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        zoomControl:false,
        streetViewControl: false
      }

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      })
      this.map.addListener('tilesloaded', () => {
        // console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
      this.modalCtrl.dismiss();
    }).catch((error) => {
      // console.log('Error getting location', error);
    });


  }


  getAddressFromCoords(lattitude, longitude) {
    // console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ",";
        }
        this.address = this.address.slice(0);

        this.locate = '{ "lat":"' + lattitude + '", "lng":"' + longitude + '", "address":"' + this.address + '"}';
        this.storage.set("locate", this.locate);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
        this.locate = '{ "lat":"' + lattitude + '", "lng":"' + longitude + '", "address":"' + this.address + '"}';
        this.storage.set("locate", this.locate);
      });
  }

}
