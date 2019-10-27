// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { Property as PropertyDetails} from '../schemas/property';
// import { environment } from '../../environments/environment';

// const {url, apiEnd} = environment.server;

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientService {
//   serverUrl = url + apiEnd;

//   constructor(private http: HttpClient) { }

//   fetchProperties(): Observable<PropertyDetails> {
//     return this.http.get<PropertyDetails>(`${this.serverUrl}/properties/`);
//   }

//   fetchProperty(id: number): Observable<PropertyDetails> {
//     return this.http.get<PropertyDetails>(`${this.serverUrl}/properties/${id}`);
//   }

//   updateProperty(property: PropertyDetails): Observable<PropertyDetails> {
//     return this.http.put<PropertyDetails>(
//       `${this.serverUrl}/properties/${property.id}`,
//       property
//     );
//   }
// }
