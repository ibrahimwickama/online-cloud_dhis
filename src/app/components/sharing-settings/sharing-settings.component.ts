import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sharing-settings',
  templateUrl: './sharing-settings.component.html',
  styleUrls: ['./sharing-settings.component.css']
})
export class SharingSettingsComponent implements OnInit {

  @Input() fileSettings;
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doCancel(){
    this.cancel.emit(false);
  }



}
