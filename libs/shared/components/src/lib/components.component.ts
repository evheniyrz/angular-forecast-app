import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, Component, ElementRef, Inject } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';

export interface MapGeocoderResponse {
  status: google.maps.GeocoderStatus;
  results: google.maps.GeocoderResult[];
}

@Component({
  selector: 'shared-components',
  imports: [],
  template: `
    <p>components works!</p>
    <button (click)="mapGeocoderFn()">Call MapGeocoder</button>
  `,
  styles: ``,
})
export class ComponentsComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private geocoder: MapGeocoder,
    private http: HttpClient
  ) {
    afterNextRender(() => {
      const scriptTag = this.document.createElement('script');
      scriptTag.innerHTML =
        '(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({v: "weekly",key: "AIzaSyCB9t2Cf7PMPw6PHpdYgPzbuUg3Yiua_ug"});';
      this.el.nativeElement.insertAdjacentElement('afterbegin', scriptTag);
    });
  }

  mapGeocoderFn(): void {
    this.http
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?lat=46.9660801&lon=32.003246&APPID=f2f367b6802fb926387ec43c28c57846'
      )
      .subscribe((resp) => console.log({ resp }));
    // this.geocoder
    //   .geocode({
    //     address: 'Mykolaiv, Ukraine',
    //   })
    //   .subscribe(({ results }) => {
    //     console.log({
    //       lt: results[0].geometry.location.lat(),
    //       lg: results[0].geometry.location.lng(),
    //     });
    //   });
    // lg: 32.003246;
    // lt: 46.9660801;
    // iconsURL: https://openweathermap.org/img/wn/replace_this_code{04d}@2x.png
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

    // api.openweathermap.org/data/2.5/forecast?q={city name},{country code}&appid={API key}

    // api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={API key}
  }
}
