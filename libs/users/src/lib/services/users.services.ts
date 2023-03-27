import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import * as countries from 'i18n-iso-countries';
import countryDataDe from 'node_modules/i18n-iso-countries/langs/de.json';
import { UsersFacade } from '../state/users.facade';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // countryDataDe = {
  //   locale: 'de',
  //   countries: {
  //     AF: 'Afghanistan',
  //     EG: 'Ägypten',
  //     AX: 'Åland',
  //     AL: 'Albanien',
  //     DZ: 'Algerien',
  //     AS: 'Amerikanisch-Samoa',
  //     VI: 'Amerikanische Jungferninseln',
  //     AD: 'Andorra',
  //     AO: 'Angola',
  //     AI: 'Anguilla',
  //     AQ: 'Antarktis',
  //     AG: 'Antigua und Barbuda',
  //     GQ: 'Äquatorialguinea',
  //     AR: 'Argentinien',
  //     AM: 'Armenien',
  //     AW: 'Aruba',
  //     AZ: 'Aserbaidschan',
  //     ET: 'Äthiopien',
  //     AU: 'Australien',
  //     BS: 'Bahamas',
  //     BH: 'Bahrain',
  //     BD: 'Bangladesch',
  //     BB: 'Barbados',
  //     BY: 'Belarus',
  //     BE: 'Belgien',
  //     BZ: 'Belize',
  //     BJ: 'Benin',
  //     BM: 'Bermuda',
  //     BT: 'Bhutan',
  //     BO: 'Bolivien',
  //     BQ: 'Bonaire',
  //     BA: 'Bosnien und Herzegowina',
  //     BW: 'Botswana',
  //     BV: 'Bouvetinsel',
  //     BR: 'Brasilien',
  //     VG: 'Britische Jungferninseln',
  //     IO: 'Britisches Territorium im Indischen Ozean',
  //     BN: 'Brunei Darussalam',
  //     BG: 'Bulgarien',
  //     BF: 'Burkina Faso',
  //     BI: 'Burundi',
  //     CL: 'Chile',
  //     CN: 'China',
  //     CK: 'Cookinseln',
  //     CR: 'Costa Rica',
  //     CI: 'Elfenbeinküste',
  //     CW: 'Curaçao',
  //     DK: 'Dänemark',
  //     DE: 'Deutschland',
  //     DM: 'Dominica',
  //     DO: 'Dominikanische Republik',
  //     DJ: 'Dschibuti',
  //     EC: 'Ecuador',
  //     SV: 'El Salvador',
  //     ER: 'Eritrea',
  //     EE: 'Estland',
  //     FK: 'Falklandinseln',
  //     FO: 'Färöer',
  //     FJ: 'Fidschi',
  //     FI: 'Finnland',
  //     FR: 'Frankreich',
  //     GF: 'Französisch-Guayana',
  //     PF: 'Französisch-Polynesien',
  //     TF: 'Französische Süd- und Antarktisgebiete',
  //     GA: 'Gabun',
  //     GM: 'Gambia',
  //     GE: 'Georgien',
  //     GH: 'Ghana',
  //     GI: 'Gibraltar',
  //     GD: 'Grenada',
  //     GR: 'Griechenland',
  //     GL: 'Grönland',
  //     GP: 'Guadeloupe',
  //     GU: 'Guam',
  //     GT: 'Guatemala',
  //     GG: 'Guernsey',
  //     GN: 'Guinea',
  //     GW: 'Guinea-Bissau',
  //     GY: 'Guyana',
  //     HT: 'Haiti',
  //     HM: 'Heard und McDonaldinseln',
  //     HN: 'Honduras',
  //     HK: 'Hongkong',
  //     IN: 'Indien',
  //     ID: 'Indonesien',
  //     IM: 'Insel Man',
  //     IQ: 'Irak',
  //     IR: 'Iran',
  //     IE: 'Irland',
  //     IS: 'Island',
  //     IL: 'Israel',
  //     IT: 'Italien',
  //     JM: 'Jamaika',
  //     JP: 'Japan',
  //     YE: 'Jemen',
  //     JE: 'Jersey',
  //     JO: 'Jordanien',
  //     KY: 'Kaimaninseln',
  //     KH: 'Kambodscha',
  //     CM: 'Kamerun',
  //     CA: 'Kanada',
  //     CV: 'Kap Verde',
  //     KZ: 'Kasachstan',
  //     QA: 'Katar',
  //     KE: 'Kenia',
  //     KG: 'Kirgisistan',
  //     KI: 'Kiribati',
  //     CC: 'Kokosinseln',
  //     CO: 'Kolumbien',
  //     KM: 'Komoren',
  //     CD: 'Kongo',
  //     KP: 'Nordkorea',
  //     KR: 'Südkorea',
  //     HR: 'Kroatien',
  //     CU: 'Kuba',
  //     KW: 'Kuwait',
  //     LA: 'Laos',
  //     LS: 'Lesotho',
  //     LV: 'Lettland',
  //     LB: 'Libanon',
  //     LR: 'Liberia',
  //     LY: 'Libyen',
  //     LI: 'Liechtenstein',
  //     LT: 'Litauen',
  //     LU: 'Luxemburg',
  //     MO: 'Macao',
  //     MG: 'Madagaskar',
  //     MW: 'Malawi',
  //     MY: 'Malaysia',
  //     MV: 'Malediven',
  //     ML: 'Mali',
  //     MT: 'Malta',
  //     MA: 'Marokko',
  //     MH: 'Marshallinseln',
  //     MQ: 'Martinique',
  //     MR: 'Mauretanien',
  //     MU: 'Mauritius',
  //     YT: 'Mayotte',
  //     MX: 'Mexiko',
  //     FM: 'Mikronesien',
  //     MD: 'Moldawien',
  //     MC: 'Monaco',
  //     MN: 'Mongolei',
  //     ME: 'Montenegro',
  //     MS: 'Montserrat',
  //     MZ: 'Mosambik',
  //     MM: 'Myanmar',
  //     NA: 'Namibia',
  //     NR: 'Nauru',
  //     NP: 'Nepal',
  //     NC: 'Neukaledonien',
  //     NZ: 'Neuseeland',
  //     NI: 'Nicaragua',
  //     NL: 'Niederlande',
  //     NE: 'Niger',
  //     NG: 'Nigeria',
  //     NU: 'Niue',
  //     MK: 'Nordmazedonien',
  //     MP: 'Nördliche Marianen',
  //     NF: 'Norfolkinsel',
  //     NO: 'Norwegen',
  //     OM: 'Oman',
  //     AT: 'Österreich',
  //     TL: 'Osttimor',
  //     PK: 'Pakistan',
  //     PS: 'Staat Palästina',
  //     PW: 'Palau',
  //     PA: 'Panama',
  //     PG: 'Papua-Neuguinea',
  //     PY: 'Paraguay',
  //     PE: 'Peru',
  //     PH: 'Philippinen',
  //     PN: 'Pitcairninseln',
  //     PL: 'Polen',
  //     PT: 'Portugal',
  //     PR: 'Puerto Rico',
  //     TW: 'Taiwan',
  //     CG: 'Republik Kongo',
  //     RE: 'Réunion',
  //     RW: 'Ruanda',
  //     RO: 'Rumänien',
  //     RU: 'Russische Föderation',
  //     BL: 'Saint-Barthélemy',
  //     MF: 'Saint-Martin',
  //     SB: 'Salomonen',
  //     ZM: 'Sambia',
  //     WS: 'Samoa',
  //     SM: 'San Marino',
  //     ST: 'São Tomé und Príncipe',
  //     SA: 'Saudi-Arabien',
  //     SE: 'Schweden',
  //     CH: 'Schweiz',
  //     SN: 'Senegal',
  //     RS: 'Serbien',
  //     SC: 'Seychellen',
  //     SL: 'Sierra Leone',
  //     ZW: 'Simbabwe',
  //     SG: 'Singapur',
  //     SX: 'Sint Maarten',
  //     SK: 'Slowakei',
  //     SI: 'Slowenien',
  //     SO: 'Somalia',
  //     ES: 'Spanien',
  //     LK: 'Sri Lanka',
  //     SH: 'St. Helena',
  //     KN: 'St. Kitts und Nevis',
  //     LC: 'St. Lucia',
  //     PM: 'Saint-Pierre und Miquelon',
  //     VC: 'St. Vincent und die Grenadinen',
  //     ZA: 'Südafrika',
  //     SD: 'Sudan',
  //     GS: 'Südgeorgien und die Südlichen Sandwichinseln',
  //     SS: 'Südsudan',
  //     SR: 'Suriname',
  //     SJ: 'Svalbard und Jan Mayen',
  //     SZ: 'Eswatini',
  //     SY: 'Syrien, Arabische Republik',
  //     TJ: 'Tadschikistan',
  //     TZ: 'Tansania, Vereinigte Republik',
  //     TH: 'Thailand',
  //     TG: 'Togo',
  //     TK: 'Tokelau',
  //     TO: 'Tonga',
  //     TT: 'Trinidad und Tobago',
  //     TD: 'Tschad',
  //     CZ: 'Tschechische Republik',
  //     TN: 'Tunesien',
  //     TR: 'Türkei',
  //     TM: 'Turkmenistan',
  //     TC: 'Turks- und Caicosinseln',
  //     TV: 'Tuvalu',
  //     UG: 'Uganda',
  //     UA: 'Ukraine',
  //     HU: 'Ungarn',
  //     UM: 'United States Minor Outlying Islands',
  //     UY: 'Uruguay',
  //     UZ: 'Usbekistan',
  //     VU: 'Vanuatu',
  //     VA: 'Vatikanstadt',
  //     VE: 'Venezuela',
  //     AE: 'Vereinigte Arabische Emirate',
  //     US: ['Vereinigte Staaten von Amerika', 'Vereinigte Staaten', 'USA'],
  //     GB: ['Vereinigtes Königreich', 'Großbritannien'],
  //     VN: 'Vietnam',
  //     WF: 'Wallis und Futuna',
  //     CX: 'Weihnachtsinsel',
  //     EH: 'Westsahara',
  //     CF: 'Zentralafrikanische Republik',
  //     CY: 'Zypern',
  //     XK: 'Kosovo',
  //   },
  // };
  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    countries.registerLocale(countryDataDe);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/v1/users');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/v1/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/api/v1/users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `http://localhost:3000/api/v1/users/${user.id}`,
      user
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:3000/api/v1/users/${userId}`
    );
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countries.getNames('de', { select: 'official' })).map(
      (entry) => {
        return {
          id: entry[0],
          name: entry[1],
        };
      }
    );
  }

  getCountry(countryKey: string): string {
    return countries.getName(countryKey, 'en');
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
