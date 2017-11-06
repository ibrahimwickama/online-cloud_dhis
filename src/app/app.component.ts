import {Component, OnInit} from '@angular/core';
import {HttpProviderService} from "./services/http-provider.service";
import {Route, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  viewList:boolean =true;
  // viewGrid:boolean =true;
  viewGrid:boolean =false;
  addResource:boolean =false;
  showShareSettings:boolean =false;
  viewFile:any;
  viewResource: boolean;
  addButton: boolean = true;

  contentToView:any = [];
  contentToView2:any = [];
  contentToViewBackUp:any = [];
  contentToViewBackUp2:any = [];
  dropMenu: any;
  editFileInfo:any;
  content:any = [];
  fileSetting:any;



  constructor(private httpProvider: HttpProviderService){

  }

  ngOnInit(){
    this.checkForContents();

  }




  checkForContents(){
    this.httpProvider.getResourceFiles().subscribe(resData => {
      this.contentToView = this.contentToViewBackUp  = resData.documents;

    });
  }

  displayView(viewMode){
    if(viewMode == 'list'){
      this.viewList = true;
      this.viewGrid = false;;
    }else if(viewMode == 'grid'){
      this.viewGrid = true;
      this.viewList = false;
    }

  }


  addOfResource(){
    this.addResource = true;
    this.addButton = false;
  }

  uploaderDidCancelAction(event){
    this.addResource = event;
    this.editFileInfo = null;
    this.addButton = true;
  }

  shareSettingInfo(event){
    this.fileSetting = event;
    this.showShareSettings = true;
  }

  shareSettingsDidCancel(event){
    this.showShareSettings = false;
  }

  receivingNewResource(event){
    console.log("did Add resource :"+event);

      //window.location.reload()

     this.contentToView.push(event);
     this.contentToViewBackUp = this.contentToView;
  }


  getFilteredList(ev) {
    let val = ev.target.value;
    this.contentToView = this.contentToViewBackUp;
    if(val && val.trim() != ''){
      this.contentToView = this.contentToView.filter((file:any) => {
        return (file.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.contentToView = this.contentToViewBackUp;
    }
  }


  viewFileInfo(event){
    this.viewResource = true;
    this.viewFile = event;
  }


  myFunction(event){
    console.log("the drop event "+event)
    this.dropMenu = 'show';

  }

  selectedOption(event){
    this.dropMenu = '';
  }


  deleteSelectedReaaource(selected){
    let clonedContent = this.contentToView.slice();
    clonedContent.forEach((content:any)=>{
      if(content == selected){
        let index = clonedContent.indexOf(content);
        clonedContent.splice(index, 1);
        this.contentToView = clonedContent;
        this.contentToViewBackUp = clonedContent;

      }
    })

  }


  onEditFile(selectedFile){
    this.editFileInfo = selectedFile;
    this.addOfResource();
  }




}
