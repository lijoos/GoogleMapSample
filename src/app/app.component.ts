import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  map: google.maps.Map;
  directionsService:  any;
  directionsRenderer: any;

  ngAfterViewInit(): void {
    const mapProp = {
      center: new google.maps.LatLng(1, 2),
      zoom: 12
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    this.directionsRenderer.setMap(this.map);
    this.calculateAndDisplayRoute(this.directionsService, this.directionsRenderer);
  }
  calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
          origin: new google.maps.LatLng(6.512596400000001, 3.3541297),
          destination: new google.maps.LatLng(6.512596400000001, 3.3841297),
          travelMode: 'WALKING'
        },
        function(response, status) {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
  }
  changeTravelMode() {

  }
}
