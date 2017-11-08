import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class HttpProviderService {

  options:any

  constructor(private httpProvider: Http) {

  }

  private handleError (error: Response) {
    return Observable.throw(error || "Server Error");
  }

  getResourceFiles() {
    let url = '../../../api/documents.json?fields=*';
    // let url = 'http://localhost:8080/api/documents.json';
    return this.httpProvider.get(url)
        .map((response: Response) => response.json())
      .catch( this.handleError );

  }

  getUserGroups(){
    let url = '../../../api/userGroups.json';
     return this.httpProvider.get(url).map((response:Response) =>
       response.json()
       // console.log("meme :"+response)
    ).catch( this.handleError );
  }

  getAllUsers(){
    let url = '../../../api/users.json';
    return this.httpProvider.get(url).map((response:Response) =>
        response.json()
      // console.log("meme :"+response)
    ).catch( this.handleError );
  }


  downloadFile(fileId){
    let reqstHeadDon = new Headers({
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' ,
      'Accept-Encoding':'gzip,deflate,br',
      'Host':'play.dhis2.org',
      'Referer':'https://play.dhis2.org/demo/dhis-web-reporting/displayViewDocumentForm.action',
      'Access-Control-Allow-Origin': '*'});
    this.options = new RequestOptions({ headers: reqstHeadDon });

    let url = '../../../api/documents/'+fileId+'/data';

    return this.httpProvider.get(url, this.options)
      .map((response: Response) => {
      response.json();
      console.log("the res :"+response)
    }).catch( this.handleError );
  }



  removeFileFromServer(data){
    let url = '../../../api/documents/'+data.id;
     return this.httpProvider.delete(url).map((response => {

    })).catch( this.handleError );
  }



  fileUpload(file){
    let url4 = '../../../dhis-web-reporting/saveDocument.action';

    let reqstHeadDon = new Headers({
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' ,
      'Accept-Encoding':'gzip,deflate,br',
      'Host':'play.dhis2.org',
      'Referer':'https://play.dhis2.org/demo/dhis-web-reporting/displayViewDocumentForm.action',
      'Access-Control-Allow-Origin': '*'});

    this.options = new RequestOptions({ headers: reqstHeadDon });
    return this.httpProvider.post(url4, file, this.options)
      .map(response =>{
        console.log("hello the response  :"+response)
      }).catch( this.handleError );

  }


  saveUserGroupAccess(aceesData,file ){
    let url = '../../../api/sharing?type=document&id='+file.id;
    let jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

    delete file.created;
    delete file.lastUpdated;
    delete file.lastUpdatedBy;
    delete file.contentType;
    delete file.href;
    delete file.url;
    delete file.external;
    delete file.attachment;
    delete file.attributeValues;
    delete file.translations;
    delete file['access'];

    this.options = new RequestOptions({ headers: jsonHeaders });
    return this.httpProvider.post(url, file, this.options)
      .map(response =>{

      }).catch( this.handleError );

  }






}
