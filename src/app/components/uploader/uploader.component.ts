import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpProviderService} from "../../services/http-provider.service";



@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],

})
export class UploaderComponent implements OnInit {

  @ViewChild('upload') upload;


  cancel: boolean;
  isFileName: boolean = false;
  @Input() fileInfo;

  @Output() cancelAction = new EventEmitter();
  @Output() addResourceAction = new EventEmitter();


  fileName:any;
  uploadType:any = true;
  isAttached:any;
  fileResource:any;
  files : any;
  fileUrl:any = 'http://';
  fetchedData:any = [];

  constructor(private elm: ElementRef,  private httpProvider: HttpProviderService) {

  }

  ngOnInit() {
    this.isFileName = false;
    this.fileName =  (this.fileInfo)?this.fileInfo.displayName: '';
  }



  doCancel(){
     this.fileInfo = null;
    this.cancel = false;
    this.cancelAction.emit(this.cancel);
  }


  listenUploadType(event){
    let val = event.target.value;
    console.log(val);
    if(val == 'true'){
      console.log("its True");
      this.uploadType = false;
    }else{
      console.log("its False");
      this.uploadType = true;
    }
  }


  uploadTypeOption(){
    if(this.uploadType){
      this.saveNewFileResource();
    }else{
      this.saveNewLinkToResource();
    }
  }

  saveNewLinkToResource(){

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let fullDate = year+'-'+(month + 1)+'-'+day;

    //let files = this.elm.nativeElement.querySelector('#upload').files;
    //let file = files[0];
    let formData = new FormData()

    formData.append('upload', '', null );
    formData.append('name',  this.fileName);
    formData.append('id', '');
    formData.append('url', this.fileUrl);
    formData.append('external', this.uploadType);
     // formData.append('att achment', this.isAttached );


    let fileDetails = {
      created:fullDate,
      lastUpdated:fullDate,
      name: this.fileName,
      href:'',
      id: '',
      displayName: this.fileName,
      publicAccess:'',
      url: this.fileUrl,
      externalAccess:'',
      external: this.uploadType,
      attachment: this.isAttached,
      contentType:'',
      lastUpdatedBy:{},
      access:{
        read:'',
        update:'',
        externalize:'',
        delete: '',
        write: '',
        manage: ''
      },
      user: {
        id: ''
      },
      userGroupAccesses: [ ],
      attributeValues: [ ],
      translations: [ ],
      userAccesses: [ ]

    };

    this.httpProvider.trialUpload(formData).subscribe(response=>{
      console.log("the  response is :"+response);
    })

    this.addResourceAction.emit(fileDetails);
    this.doCancel();
  }



  saveNewFileResource(){

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let fullDate = year+'-'+(month + 1)+'-'+day;

    let files = this.elm.nativeElement.querySelector('#upload').files;
    let formData = new FormData();
     let file = files[0];
     formData.append('upload', file );
     formData.append('name',  this.fileName);
     formData.append('id', '');
     formData.append('url', 'http://');
     formData.append('external', this.uploadType);
     formData.append('attachment', this.isAttached );

     console.log("file is :"+JSON.stringify(file))

    let fileDetails = {
      created:fullDate,
      lastUpdated:fullDate,
      name: this.fileName,
      href:'',
      id: '',
      displayName: this.fileName,
      publicAccess:'',
      url: file.name,
      externalAccess:'',
      external: this.uploadType,
      attachment: this.isAttached,
      contentType:'',
      lastUpdatedBy:{},
      access:{
        read:'',
        update:'',
        externalize:'',
        delete: '',
        write: '',
        manage: ''
      },
      user: {
        id: ''
      },
      userGroupAccesses: [ ],
      attributeValues: [ ],
      translations: [ ],
      userAccesses: [ ]

     };

    this.fetchedData.push(fileDetails)

    let finaleObj = {documents: this.fetchedData};

    this.httpProvider.trialUpload(formData).subscribe(response=>{
      console.log("result from upload :"+response)
    });

    this.addResourceAction.emit(fileDetails);
    console.log("value..."+JSON.stringify(fileDetails))
    this.fileInfo = null;
    this.doCancel();

  }


  gettingName(event){
    let val = event.target.value;
    //console.log(val)
    if(val && val.trim() != ''){
      this.isFileName = true;
    }else{

      this.isFileName = false;
    }
  }


  createDataStoreObjKey() {
    let formatter = new Intl.DateTimeFormat("fr", { month: "short" }),
      month = formatter.format(new Date()),
      text = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 3; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return month.slice(0, -1).toUpperCase().concat('_', text);

  }



}
