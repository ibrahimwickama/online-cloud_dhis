import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../../services/utilities.service";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() contentToViewList;
  @Output() viewFile = new EventEmitter();

  viewResource:any;
  dropMenu:any;
  valuer: any = [];
  //viewFile:any;


  constructor(private utilService: UtilitiesService) { }

  ngOnInit() {
    // this.contentOnView = ['ibrahim', 'wickama', 'Yusuph'];
  }

  viewOptions(event){
    console.log("the event "+JSON.stringify(event))
    this.valuer.push(event)

    if((this.valuer.length % 2) == 0 ){
      this.dropMenu = '';
    }else {
      this.dropMenu = 'show';
    }

  }

  viewOfResource(content){
    //this.viewResource = true;
    //this.viewFile = content;
    this.viewFile.emit(content);
  }

  getFileIcon(extension){
    let link = this.utilService.getResourceIcon(extension);
    return link;
}


}
