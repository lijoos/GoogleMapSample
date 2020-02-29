import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ProviderModel } from '../app.component.model';

@Component({
  selector: 'app-map-direction-panel',
  templateUrl: './map-direction-panel.component.html',
  styleUrls: ['./map-direction-panel.component.css']
})
export class MapDirectionPanelComponent implements AfterViewInit , OnInit {
  map: google.maps.Map;
  directionsService:  any;
  marker: any;
  directionsRenderer: any;
  travelMode: any;
  drivingMode: any = 'WALKING';
  start: ProviderModel = new ProviderModel();
  end: any ;
// tslint:disable-next-line: max-line-length
  providerList: ProviderModel[] = new Array<ProviderModel>();
  location: ProviderModel;
  contentString: any;
  infowindow = new google.maps.InfoWindow();
  currentLat: number;
  mapRangeSelect = 5;
  mapRange: String = '5';
  currentLong: number;
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // tslint:disable-next-line: max-line-length
   this.providerList  = JSON.parse('[{"latitude":"-6.189833","longitude":"106.82925","street":"JL. HOS. COKROAMINOTO NO.31-32, MENTENG","phone":"000213144989","email":"MIMI.TAMSY@ABDIWALUYO.COM","city":"JAKARTA PUSAT","fullname":"RS ABDI WALUYO"},{"latitude":"-6.191333","longitude":"106.841","street":"JL. RADEN SALEH NO. 40","phone":"0002138997777","email":"MARKETING@RSCIKINI.COM; MAIL.REKENING@RSCIKINI.COM","city":"JAKARTA PUSAT","fullname":"RS PGI CIKINI"},{"latitude":"-6.245056","longitude":"106.815944","street":"JL. BANGKA RAYA NO. 28 - 30, MAMPANG PRAPATAN","phone":"000217194434","email":"GKS.ACC3@GMAIL.COM; GKSEHAT.ACC2@GMAIL.COM","city":"JAKARTA SELATAN","fullname":"KLINIK ESTI"},{"latitude":"-6.240111","longitude":"106.841194","street":"GEDUNG BINASENTRA LANTAI DASAR, JL. GATOT SOEBROTO KAV 71-73","phone":"0002183783535","email":"MARKETING@BIDAKARAMEDICAL.CO.ID;","city":"JAKARTA SELATAN","fullname":"KLINIK BIDAKARA MEDICAL CENTRE"},{"latitude":"-6.198978","longitude":"106.850635","street":"JL SALEMBA SATU NO 11-13","phone":"000213913336","email":"DWI@SSMEDIKA.CO.ID","city":"JAKARTA PUSAT","fullname":"RS KHUSUS BEDAH SS MEDIKA"},{"latitude":"-6.2095","longitude":"106.8195","street":"JL JEND SUDIRMAN NO 86","phone":"0002157853911","email":"AHMADSYAEPULLOH.SSMH@RSMURNITEGUH.COM","city":"JAKARTA PUSAT","fullname":"RS MURNI TEGUH SUDIRMAN JAKARTA"},{"latitude":"-6.238778","longitude":"106.833472","street":"JL. JEND. GATOT SUBROTO KAV.59","phone":"000215210200","email":"CUSTOMERCARE@MEDISTRA.COM; EKI@MEDISTRA.COM","city":"JAKARTA SELATAN","fullname":"RS MEDISTRA"},{"latitude":"-6.220354","longitude":"106.868209","street":"JL RAYA JATINEGARA TIMUR, NO 57","phone":"000218191312","email":"DIRSEK311@GMAIL.COM","city":"JAKARTA TIMUR","fullname":"KLINIK DEVITA PROFIT"},{"latitude":"-6.215092","longitude":"106.819850","street":"WTC 3, RETAIL PODIIUM LANTAI 2, JENDRAL SUDIRMAN KAV 29-31","phone":"02129522657","email":"DDCLINICJAKARTA@GMAIL.COM","city":"JAKARTA SELATAN","fullname":"KLINIK DIVINE DENTAL"},{"latitude":"-6.218455","longitude":"106.816317","street":"JL JEND SUDIRMAN KAV 49","phone":"000215732241","email":"MARKETING@RSJAKARTA.CO.ID","city":"JAKARTA SELATAN","fullname":"RS JAKARTA"},{"latitude":"-6.180374","longitude":"106.818384","street":"JL BUDI KEMULIAAN NO. 25, GAMBIR","phone":"000213842828","email":"RSBUDIKEMULIAAN@INDO.NET.ID; CORPORATE@RSIABUDIKEMULIAAN.COM","city":"JAKARTA PUSAT","fullname":"RSU BUDI KEMULIAAN JAKARTA"},{"latitude":"-6.191349","longitude":"106.827914","street":"JL. GEREJA THERESIA NO. 22, MENTENG","phone":"00213909725","email":"MARKETIN@RSYPKMANDIRI.CO.ID","city":"JAKARTA PUSAT","fullname":"RSU YPK MANDIRI"},{"latitude":"-6.224483","longitude":"106.830420","street":"KUNINGAN CITY MALL, JL PROF DR SATRIO KAV 18","phone":"0002130051801","email":"AWALOKYT@YAHOO.CO.ID","city":"JAKARTA SELATAN","fullname":"KLINIK UTAMA AIC"}]');
   this.end = this.providerList[0];
  }
  ngAfterViewInit(): void {
    this.directionsService = new google.maps.DirectionsService();
     this.directionsRenderer = new google.maps.DirectionsRenderer();
   this.mapLocData();
  }
  mapLocData() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.start.latitude = String(position.coords.latitude);
      this.start.longitude = String(position.coords.longitude);
      const mapProp = {
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 12
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapProp);
      this.directionsRenderer.setMap(this.map);
      this.directionsRenderer.setPanel(document.getElementById('right-panel'));
      this.addMarker(mapProp.center, this.map);
      new google.maps.Circle({
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: this.map,
        radius: this.mapRangeSelect * 1000,          // IN METERS.
        fillColor: '#FF6600',
        fillOpacity: 0.3,
        strokeColor: '#FFF',
        strokeWeight: 0         // DON'T SHOW CIRCLE BORDER.
      }).setMap(this.map);
      this.locateMarker();
    });

  }
  calculateAndDisplayRoute(directionsService, directionsRenderer) {
    this.directionsRenderer.setPanel(document.getElementById('right-panel'));
    directionsService.route(
        {
           origin: new google.maps.LatLng(Number(this.start.latitude), Number(this.start.longitude)),
           destination: new google.maps.LatLng(this.end.latitude, this.end.longitude),
          travelMode: this.drivingMode
        },
        function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }
  locateMarker() {
    // Show marker in map

    for (let i = 0; i < this.providerList.length; ++i) {
      this.location = this.providerList[i];
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(Number(this.location.latitude), Number(this.location.longitude)),
        map: this.map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
      this.marker.setMap(this.map);
      this.contentString  = this.getContentString(this.location);
       google.maps.event.addListener(this.marker, 'click', (function(marker, contentString, infowindow) {
        return function() {
          infowindow.setContent(contentString);
          infowindow.open(this.map, marker);
        };
    })(this.marker, this.contentString, this.infowindow));
    }
  }
  getContentString(marker: any): any {
// tslint:disable-next-line: max-line-length
    let contentString = '<div id="contentText" style="width:250px;word-wrap:break-word;font-size:12px"> <h6 style="margin: 0"><b>' + marker.fullname + '</b></h6>' +
    '<p>' + marker.street + '</p>' +
    '<p>' + marker.city + '</p>';
    if (marker.phone !== null) {
      contentString +=  '<p> <b>Phone : </b>' + marker.phone + '</p>' ;
      }
      contentString += ' </div>';
   return contentString;
  }
  addMarker(pos, map) {
    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
  }
  changeTravelMode(event) {
    this.drivingMode = event.target.value;
    this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
  }
  changeDestination(event) {
    this.end = this.providerList[event.target.value];
    this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
  }
  changeSource(event) {
    if (event.target.value === 'location') {
      navigator.geolocation.getCurrentPosition((position) => {
      this.start.latitude = String(position.coords.latitude);
      this.start.longitude = String(position.coords.longitude);
      this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
      });
    } else {
    this.start = this.providerList[event.target.value];
    this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
    }
  }
}
