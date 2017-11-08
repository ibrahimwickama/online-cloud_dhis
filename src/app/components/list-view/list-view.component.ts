import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../../services/utilities.service";
import {HttpProviderService} from "../../services/http-provider.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() contentToViewList;
  @Output() viewFile = new EventEmitter();
  @Output() deletefile = new EventEmitter();
  @Output() editFile = new EventEmitter();
  @Output() shareSettings = new EventEmitter();

  isConnected: Observable<boolean>;

  viewResource:any;



  constructor(private utilService: UtilitiesService, private httpProvider:HttpProviderService) {
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }

  ngOnInit() {

  }


  getFileIcon(extension){
    let link = this.utilService.getResourceIcon(extension);
    return link;
}


  doShareSettings(content){
    this.shareSettings.emit(content)
  }

  editResource(file){
    //this.doEdit = true;
    this.editFile.emit(file);
  }

  removeResource(data){
    this.httpProvider.removeFileFromServer(data).subscribe(response=>{
      console.log("worekd "+response)
    })

  }



}
