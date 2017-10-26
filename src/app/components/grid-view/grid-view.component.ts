import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  @Input() contentToViewGrid;
  @Output() viewFile = new EventEmitter();

  icon: string;

  constructor(private utilService: UtilitiesService) { }

  ngOnInit() {
  }

  viewOfResource(content){
    this.viewFile.emit(content);

  }



  getFileIcon(extension){
    let link = this.utilService.getResourceIcon(extension);
    return link;
  }

}
