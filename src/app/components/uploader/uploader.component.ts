import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Output, ViewChild} from '@angular/core';
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
  uploding:any;

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

      if(this.fileInfo){
        this.httpProvider.removeFileFromServer(this.fileInfo).subscribe(response=>{
          this.saveNewFileResource();
        })
      }else{
        this.saveNewFileResource();
      }

    }else{
      if(this.fileInfo){
        this.httpProvider.removeFileFromServer(this.fileInfo).subscribe(response=>{
          this.saveNewLinkToResource();
        })
      }else{
        this.saveNewLinkToResource();
      }
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
    formData.append('external', 'true');
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

    this.httpProvider.fileUpload(formData).subscribe(response=>{
      console.log("the  response is :"+response);
    })

    setTimeout(()=>{
      this.addResourceAction.emit("refresh")
      },5000);

    this.fileInfo = null;
    this.doCancel();
  }



  saveNewFileResource(){
    this.uploding = true;

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let fullDate = year+'-'+(month + 1)+'-'+day;

    let files = this.elm.nativeElement.querySelector('#upload').files;
    let formData = new FormData();
     let file = files[0];
     formData.append('upload', file , file.name );
     formData.append('name',  this.fileName);
     formData.append('id', '');
     formData.append('url', 'http://');
     formData.append('external', "false" );
     formData.append('attachment', this.isAttached );

    this.httpProvider.fileUpload(formData).subscribe(response=>{
      console.log("result from upload :"+response);

    });

    setTimeout(
      this.addResourceAction.emit("refresh")
      ,5000);



    this.doCancel();

  }


  gettingName(event){
    let val = event.target.value;
    if(val && val.trim() != ''){
      this.isFileName = true;
    }else{
      this.isFileName = false;
    }
  }



}
