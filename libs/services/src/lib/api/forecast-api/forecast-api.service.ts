import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RootApiService } from 'libs/services/src/lib/api/root-api.service';
import { catchError, map, Observable, of } from 'rxjs';
// import {TodayWeatherResponse} from './types/today-weather-response';

@Injectable()
export class ForecastApiService<T> extends RootApiService {
  constructor(
    @Inject(String) apiHost: string,
    @Inject(String) endpoint: string,
    httpClient: HttpClient
  ) {
    super(apiHost, endpoint, httpClient);
  }
  // /weather forecast current
  // https://api.openweathermap.org/data/2.5/weather?q=Mykolayiv,ua&appid=f2f367b6802fb926387ec43c28c57846
  // *****************************************

  // Call weather forecast for 5 days 3hrs range
  // api.openweathermap.org/data/2.5/forecast?q=Mykolayiv,ua&appid=f2f367b6802fb926387ec43c28c57846
  //   q-	required	City name, state code and country code divided by comma, Please refer to ISO 3166 for the state codes or country codes.
  // You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations.
  // cnt-	optional	A number of days, which will be returned in the API response (from 1 to 16). Learn more
  // appid-	required	Your unique API key (you can always find it on your account page under the "API key" tab)
  // mode-	optional	Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more
  // units-	optional	Units of measurement. 'standard', 'metric' and 'imperial' units are available. If you do not use the units parameter, standard units will be applied by default. Learn more
  // lang-	optional	You can use this parameter to get the output in your language. Learn more

  protected weatherGet(
    cityName = 'Mykolayiv',
    countryCode = 'ua'
  ): Observable<T> {
    const params = this.generateGetRequestParams({
      q: `${cityName},${countryCode}`,
      units: 'metric',
    });
    const requestOption: HttpRequest<unknown> = new HttpRequest('GET', '', {
      params,
      withCredentials: true,
      responseType: 'json',
      observe: 'body',
      reportProgress: false,
    });
    return this.apiRequest<T>(requestOption).pipe(
      map((response: HttpResponse<T>) => response.body as T),
      catchError((error: HttpErrorResponse) => {
        return of({
          code: error ?? ['cod'],
          message: error.message,
        } as T);
      })
    );
  }
}

const q = {
  method: 'string',
  url: 'string',
  options: {
    body: 'any;',
    headers: 'HttpHeaders',
    context: 'HttpContext',
    observe: 'body',
    params: 'HttpParams',
    reportProgress: false,
    responseType: 'json',
    withCredentials: true,
    transferCache: {
      includeHeaders: 'string[];',
    },
  },
};
// supported Lang codes
// sq Albanian
// af Afrikaans
// ar Arabic
// az Azerbaijani
// eu Basque
// be Belarusian
// bg Bulgarian
// ca Catalan
// zh_cn Chinese Simplified
// zh_tw Chinese Traditional
// hr Croatian
// cz Czech
// da Danish
// nl Dutch
// en English
// fi Finnish
// fr French
// gl Galician
// de German
// el Greek
// he Hebrew
// hi Hindi
// hu Hungarian
// is Icelandic
// id Indonesian
// it Italian
// ja Japanese
// kr Korean
// ku Kurmanji (Kurdish)
// la Latvian
// lt Lithuanian
// mk Macedonian
// no Norwegian
// fa Persian (Farsi)
// pl Polish
// pt Portuguese
// pt_br Português Brasil
// ro Romanian
// ru Russian
// sr Serbian
// sk Slovak
// sl Slovenian
// sp, es Spanish
// sv, se Swedish
// th Thai
// tr Turkish
// ua, uk Ukrainian
// vi Vietnamese
// zu Zulu
/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX **/
// af - afghanistan
// al - albania
// dz - algeria
// ad - andorra
// ao - angola
// ar - argentina
// am - armenia
// au - australia
// at - austria
// az - azerbaijan
// bh - bahrain
// bd - bangladesh
// by - belarus
// be - belgium
// bz - belize
// bj - benin
// bo - bolivia
// ba - bosnia and herzegovina
// bw - botswana
// br - brazil
// bg - bulgaria
// kh - cambodia
// cm - cameroon
// ca - canada
// cl - chile
// cn - china
// co - colombia
// cr - costa rica
// hr - croatia
// cy - cyprus
// cz - czech republic
// dk - denmark
// dj - djibouti
// do - dominican republic
// ec - ecuador
// eg - egypt
// sv - el salvador
// ee - estonia
// et - ethiopia
// fi - finland
// fr - france
// ge - georgia
// de - germany
// gh - ghana
// gr - greece
// gt - guatemala
// hk - hong kong
// hu - hungary
// is - iceland
// in - india
// id - indonesia
// ir - iran
// iq - iraq
// ie - ireland
// il - israel
// it - italy
// jm - jamaica
// jp - japan
// jo - jordan
// kz - kazakhstan
// ke - kenya
// kr - Sth korea
// kp - Nth korea
// kw - kuwait
// kg - kyrgyzstan
// lv - latvia
// lb - lebanon
// lt - lithuania
// lu - luxembourg
// mo - macau
// mg - madagascar
// my - malaysia
// mx - mexico
// ma - morocco
// np - nepal
// nl - netherlands
// nz - new zealand
// ng - nigeria
// no - norway
// om - oman
// pk - pakistan
// pa - panama
// py - paraguay
// pe - peru
// ph - philippines
// pl - poland
// pt - portugal
// qa - qatar
// ro - romania
// ru - russia
// rw - rwanda
// sa - saudi arabia
// sg - singapore
// sk - slovakia
// si - slovenia
// za - south africa
// es - spain
// se - sweden
// ch - switzerland
// tw - taiwan
// th - thailand
// tn - tunisia
// tr - turkey
// ua - ukraine
// ae - united arab emirates
// gb - united kingdom
// us - united states
// uy - uruguay
// uz - uzbekistan
// ve - venezuela
// vn - vietnam
// zm - zambia
// zw - zimbabwe
// {
//   "coord": {
//       "lon": 31.9974,
//       "lat": 46.9659
//   },
//   "weather": [
//       {
//           "id": 804,
//           "main": "Clouds",
//           "description": "overcast clouds",
//           "icon": "04d"
//       }
//   ],
//   "base": "stations",
//   "main": {
//       "temp": 285.9,
//       "feels_like": 284.69,
//       "temp_min": 285.9,
//       "temp_max": 285.9,
//       "pressure": 1011,
//       "humidity": 56,
//       "sea_level": 1011,
//       "grnd_level": 1006
//   },
//   "visibility": 10000,
//   "wind": {
//       "speed": 6.7,
//       "deg": 196,
//       "gust": 9.68
//   },
//   "clouds": {
//       "all": 97
//   },
//   "dt": 1741682163,
//   "sys": {
//       "country": "UA",
//       "sunrise": 1741666382,
//       "sunset": 1741708274
//   },
//   "timezone": 7200,
//   "id": 700569,
//   "name": "Mykolayiv",
//   "cod": 200
// }
