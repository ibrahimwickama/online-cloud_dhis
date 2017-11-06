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
  addedUser:any = [];
  allUsers:any = [];
  selectedUserGroup:any;
  singleUser:any;
  showUsers: boolean = false;
  accessMode:any;
  publicAccess:any;
  userCreatedFile:any;

  constructor(private httpProvider:HttpProviderService) { }

  ngOnInit() {
    this.accessMode = 'rw------';
    this.fetchUsers();
    this.fetchUserGroups();
  }

  fetchUsers(){
    this.httpProvider.getAllUsers().subscribe(response=>{
      this.allUsers = response.users;
      this.allUsers.forEach((user:any)=>{
        if(user.id == this.fileSettings.user['id'] ){
          this.userCreatedFile = user.displayName;
        }
      })
    })
  }

  fetchUserGroups(){
    this.httpProvider.getUserGroups().subscribe(response=>{
      this.userGroup  = this.userGroupBackUp = response.userGroups;
    })
  }

  doCancel(){
    this.cancel.emit(false);
  }

  searchEvent(event){
    let val = event.target.value;
    console.log(val);
    this.userGroup = this.userGroupBackUp;
    if(val && val.trim() != ''){
      this.showUsers = true;
      this.userGroup = this.userGroup.filter((userGroup:any) => {
        return (userGroup.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.userGroup = this.userGroupBackUp;
      this.showUsers = false;
    }
  }

  setUser(user){
    this.selectedUserGroup = user.displayName;
    this.singleUser = user
    this.showUsers = false;
  }

  addUserGroup(){
    let userInfo = {
      id:this.singleUser.id,
      userGroupUid:this.singleUser.id,
      displayName:this.singleUser.displayName,
      access:this.accessMode
    };

    this.addedUser.push(userInfo);
    this.fileSettings.userGroupAccesses = this.addedUser;
    this.fileSettings.publicAccess = this.publicAccess;
    console.log("OverView on file :"+JSON.stringify(this.fileSettings))
  }

  onSaveGroupAccess(){
    this.httpProvider.saveUserGroupAccess(this.addedUser, this.fileSettings).subscribe(response=>{

      console.log("did it work :"+response)
      this.doCancel();
    })
  }



}
