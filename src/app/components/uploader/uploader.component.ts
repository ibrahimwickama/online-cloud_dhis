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


  fileName:any = ' ';
  uploadType:any = true;
  isAttached:any;
  fileResource:any;
  files : any;
  fileUrl:any;
  fetchedData:any = [];

  constructor(private elm: ElementRef,  private httpProvider: HttpProviderService) {
   // elm: ElementRef;
  }

  ngOnInit() {

    this.isFileName = false;
   // this.initiateFiles();
  }

  // initiateFiles(){
  //   this.httpProvider.pullCurrentFiles().subscribe(response =>{
  //     this.fetchedData = response.documents;
  //     console.log("fechedData: "+JSON.stringify(this.fetchedData))
  //   })
  // }

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



  saveNewResource(){
    //console.log("file is: "+this.fileName+ " upload Type is: "+this.uploadType+ " and file is: "+JSON.stringify(this.fileResource))
    let date = new Date();

    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let fullDate = year+'-'+(month + 1)+'-'+day;

    console.log("new Date :"+ date )
    let files = this.elm.nativeElement.querySelector('#upload').files;
    let formData = new FormData();
     let file = files[0];
     formData.append('upload', file );
     formData.append('name',  this.fileName);
     formData.append('id', '');
     formData.append('url', 'http://');
     formData.append('external', this.uploadType);
     formData.append('attachment', this.isAttached );

     //this.httpProvider.uploadResource(formData).subscribe(response =>{ console.log(response)} )

     console.log("file is :"+JSON.stringify(file))

    let fileDetails = {
      created:fullDate,
      lastUpdated:fullDate,
      name: this.fileName,
      href:'',
      id: "hKYLLpNicBA",
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

    // fileDetails.id = ''
    // fileDetails.displayName  = this.fileName;
    // fileDetails.extension = this.fileName.split(".")[1]
      //let extension = this.fileName.split(".")[1]
    //alert(extension)

    this.fetchedData.push(fileDetails)

    let finaleObj = {documents: this.fetchedData};

    //this.httpProvider.uploadResource(JSON.stringify(fileDetails)).subscribe(response =>{ console.log(response)} );



    // this.httpProvider.uploadResource(file.name).subscribe(response =>{
    //   console.log("the pushed goods: "+response)
    // });

    this.httpProvider.trialUpload(formData).subscribe(response=>{
      console.log("result from upload :"+response)
    });


    // this.httpProvider.tempUploader(formData).subscribe(response =>{ console.log(response)} );
    this.addResourceAction.emit(fileDetails);
    // this.addResourceAction.emit(this.fileName);

    console.log("value..."+JSON.stringify(fileDetails))

    this.fileInfo = null;

    this.doCancel();

  }



  getFileValue(event){

    this.files = event.slice();

    console.log(this.files)

    let value = document.getElementById('upload');

    let file = event.srcElement;
    let file1 = event.target['files'];
    this.fileResource = event.srcElement;
    console.log("the value is :"+JSON.stringify(this.files))

    alert(JSON.stringify(event.target.files[0]))
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
