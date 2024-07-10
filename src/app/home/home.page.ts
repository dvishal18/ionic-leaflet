import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import * as L from 'leaflet';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  private map: any;

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').fitWorld()

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(this.map);

    this.map.locate({ setView: true, maxZoom: 16 });

    this.map.on('locationfound', (e: any) => {
      var radius = e.accuracy;

      L.marker(e.latlng).addTo(this.map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();
  
      L.circle(e.latlng, radius).addTo(this.map);
    });

    this.map.on('locationerror', (e: any) => {
      alert(e.message);
    });
  }
}