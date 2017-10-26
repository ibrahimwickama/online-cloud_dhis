import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpProviderService} from "../../services/http-provider.service";
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {

  @Input() fileToView;
  @Output() deletefile = new EventEmitter();
  @Output() editFile = new EventEmitter();

  doEdit:boolean;


  constructor(private httpProvider: HttpProviderService, private utilService: UtilitiesService) { }

  ngOnInit( ) {
  }

  cancelDialog(){

  }

  goViewResource(){
    console.log("filei id :"+this.fileToView.id)
    this.httpProvider.downloadFile(this.fileToView.id).subscribe();
  }

  openSharingSettings(){

  }

  editResource(){
     //this.doEdit = true;
     this.editFile.emit(this.fileToView);
  }

  removeResource(){
    this.deletefile.emit(this.fileToView);
  }


  getFileIcon(extension){
    let link = this.utilService.getResourceIcon(extension);
    return link;
  }


}
