import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpProviderService} from "../../services/http-provider.service";

@Component({
  selector: 'app-sharing-settings',
  templateUrl: './sharing-settings.component.html',
  styleUrls: ['./sharing-settings.component.css']
})
export class SharingSettingsComponent implements OnInit {

  @Input() fileSettings;
  @Output() cancel = new EventEmitter();

  userGroup:any = [];
  userGroupBackUp:any = [];

  constructor(private httpProvider:HttpProviderService) { }

  ngOnInit() {
    this.fetchUserGroups();
  }

  fetchUserGroups(){
    this.httpProvider.getUserGroups().subscribe(response=>{
      this.userGroup = response.userGroups;
      console.log("Users :"+JSON.stringify(response.userGroups));
    })
  }

  doCancel(){
    this.cancel.emit(false);
  }

  searchEvent(event){
    let val = event.target.value;
    this.userGroup = this.userGroupBackUp;
    if(val && val.trim() != ''){
      this.userGroup = this.userGroup.filter((userGroup:any) => {
        return (userGroup.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.userGroup = this.userGroupBackUp;
    }
  }



}
