import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class ManifestServiceService {

  constructor(private http:Http) { }

  // getRootUrl(): Observable<string> {
  //   return this.http.get('manifest.webapp').map(manifect => { return manifect.activities.dhis.href});
  // }

}
