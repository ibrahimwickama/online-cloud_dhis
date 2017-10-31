import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable()
export class HttpProviderService {

  options:any

  constructor(private httpProvider: Http) {
 // private httpProvider: Http    Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
 //    let jsonHeaders = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
 //    let reqstHead = new Headers({ 'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' });
 //    let reqstHeadDon = new Headers({
 //      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' ,
 //      'Accept-Encoding':'gzip,deflate,br',
 //      'Host':'play.dhis2.org',
 //      'Referer':'https://play.dhis2.org/demo/dhis-web-reporting/displayViewDocumentForm.action',
 //      'Access-Control-Allow-Origin': '*'});
 //
 //    let uploadHeader = new Headers({ 'Content-Type':'multipart/form-data,boundary=----WebKitFormBoundaryjyQNZu573YWZ2wdM'});
 //
 //    //this.options = new RequestOptions({headers: reqstHead }); // Create a request option
 //    this.options = new RequestOptions({ headers: reqstHeadDon }); // Create a request option
  }

  getResourceFiles() {
    let url = '../../../api/documents.json?fields=*';
    // let url = 'http://localhost:8080/api/documents.json';
    return this.httpProvider.get(url)
        .map((response: Response) => response.json());

  }


  // getResourceFullData(fileId){
  //   let url = '../../../api/documents/'+fileId+'.json';
  //   return this.httpProvider.get(url)
  //     .map((response: Response) => response.json());
  // }

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
    });;
  }


  deleteResourceFile(){
    let url = '../../../dhis-web-reporting/removeDocument.action';
    //this.httpProvider.post(url, )
  }

  uploadResource(formData){
    let jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

    let uploadHeader = new Headers({ 'Content-Type':'multipart/form-data,boundary=----WebKitFormBoundaryAf4FHp6AqgAhmk6A',
       'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      // 'Access-Control-Allow-Origin':'https://play.dhis2.org',
      // 'Referer':'https://play.dhis2.org/demo/dhis-web-reporting/displayAddDocumentForm.action',
      // 'Host':'play.dhis2.org',
      // 'Origin':'https://play.dhis2.org'
    });


    this.options = new RequestOptions({ headers: uploadHeader });
    let url2 = '../../../api/documents';
    let url4 = '../../../api/fileResources';
    let url = '../../../dhis-web-reporting/saveDocument.action';
    let url3 = '../../../api/dataStore/METADATASTORE/Version_3.json';
    return this.httpProvider.post(url4, formData, this.options).map((response: Response) => {
      response
      console.log("the save is :"+JSON.stringify(response))
    })
  }


  tempUploader(data){
    let url = '../../../api/documents';

     return this.httpProvider.post(url, data).map((response => {
      console.log("trial upload :"+response)
    }))

  }

  uploader(payload){
    let uploadHeader = new Headers({ 'Content-Type':'multipart/form-data,boundary=----WebKitFormBoundaryAf4FHp6AqgAhmk6A',
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Access-Control-Allow-Origin':'https://play.dhis2.org'});

    let jsonHeaders = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: uploadHeader });
    let url3 = '../../../api/dataStore/METADATASTORE/Version_4';
    let url = '../../../api/documents/hKYLLpNicBA';
    let url4 = '../../../dhis-web-reporting/saveDocument.action';
    return this.httpProvider.put(url4, payload, this.options).map((response: Response) => {
      response
      console.log("the save is :"+JSON.stringify(response))
    })
  }


  pullCurrentFiles(){
    let url = '../../../api/dataStore/METADATASTORE/Version_4.json';
    return this.httpProvider.get(url).map((response: Response) => response.json());
  }


  trialUpload(file){
    let url = '../../../api/fileResources';
    let fd = new FormData();
    let someHeader = new Headers({'Content-Type': 'multipart/form-data, boundary=----WebKitFormBoundaryAf4FHp6AqgAhmk6A' ,
      'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    })
    fd.append('file', file);
    this.options = new RequestOptions({ headers: someHeader });
    return this.httpProvider.post(url, file, this.options)
      .map(response =>{
        console.log("hello the response :"+response)
      })

}


  // getCurrentUserDatasets () {
  //   return this.http.get(this._rootDir + 'api/me/dataSets.json?fields=forms')
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }


  // fetchDocuments(){
  //   let url = '../../../api/dataStore/METADATASTORE/Version_1.json';
  //
  //   return this.httpProvider.get(url).map((response: Response) => {
  //     response.json();
  //     console.log("Documents fetch are :"+JSON.stringify(response));
  //   });;
  // }

}
