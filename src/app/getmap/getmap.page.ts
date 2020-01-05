import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Storage } from '@ionic/Storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-getmap',
  templateUrl: './getmap.page.html',
  styleUrls: ['./getmap.page.scss'],
})
export class GetmapPage implements OnInit {
  @ViewChild('map')
  mapElement: ElementRef;
  map: any;
  address: string;
  locate: string;
  constructor(
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private storage: Storage,
    public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    var lat;
    var lng;
    this.storage.get("getmap").then(async (res) => {
      // console.log(res);
      lat = res.lat;
      lng = res.lng;

      // let latLng = new google.maps.LatLng(lat, lng);
      // console.log(latLng);
      // console.log(lat + " " + lng);
      let mapOptions = {
        center: { lat: Number(lat), lng: Number(lng) },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggable: false,
        zoomControl:false,
        streetViewControl: false
      }
      
      this.getAddressFromCoords(Number(lat), Number(lng));

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
        position: { lat: Number(lat), lng: Number(lng) },
        map: this.map
      })
      this.map.addListener('tilesloaded', () => {
        // console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });
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
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
        this.locate = '{ "lat":"' + lattitude + '", "lng":"' + longitude + '", "address":"' + this.address + '"}';
      });
  }

}
