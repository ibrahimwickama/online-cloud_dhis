import {Component, OnInit} from '@angular/core';
import {HttpProviderService} from "./services/http-provider.service";

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
  viewFile:any;
  viewResource: boolean;

  contentToView:any = [];
  contentToView2:any = [];
  contentToViewBackUp:any = [];
  contentToViewBackUp2:any = [];
  dropMenu: any;
  editFileInfo:any;
  content:any = [];

  constructor(private httpProvider: HttpProviderService){

  }

  ngOnInit(){
    this.checkForContents();
    //this.getDocs()
  }

  // getDocs(){
  //   this.httpProvider.fetchDocuments().subscribe(resData => {
  //     let docs = resData
  //    // console.log("Documents fetch are :"+JSON.stringify(docs));
  //   })
  // }

  checkForContents(){
    let url = '../../../api/resources.json';
    //let content:any;
    // console.log( " the value "+JSON.stringify(this.http.get(url).mapTo((response: Response) => response.json())))

    this.httpProvider.getResourceFiles().subscribe(resData => {
      this.contentToView = this.contentToViewBackUp  = resData.documents;

      // this.contentToView.forEach((fileContent:any)=>{
      //   this.httpProvider.getResourceFullData(fileContent.id).subscribe(fileData=>{
      //     this.contentToView2.push(fileData);
      //   this.contentToViewBackUp2 = this.contentToView2})
      // })


    });

    // let content = this.httpProvider.getResourceFiles();
    //  console.log("the files are :"+this.content)
    //  content.forEach((document:any)=>{
    //   console.log(document)
    //  })

  }






  displayView(viewMode){
    if(viewMode == 'list'){
      this.viewList = true;
      this.viewGrid = false;;
    }else if(viewMode == 'grid'){
      this.viewGrid = true;
      this.viewList = false;
    }

    //console.log("the Fetched :"+JSON.stringify(this.contentToView2))

  }


  addOfResource(){
    this.addResource = true;
    let url = 'localhost:8080/api/resources.json';

  }

  uploaderDidCancelAction(event){
    // console.log("value ......for Cancel is "+JSON.stringify(event))
    this.addResource = event;
  }

  receivingNewResource(event){
    // this.contentToView = [];

    this.contentToView.push(event);
    // this.contentToViewBackUp.push(event);
    this.contentToViewBackUp = this.contentToView;

  }


  getFilteredList(ev) {
    let val = ev.target.value;
    //console.log("event value serch is: "+val)

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
        // console.log("index :"+JSON.stringify(index))
        clonedContent.splice(index, 1);
        this.contentToView = clonedContent;
        this.contentToViewBackUp = clonedContent;
        //console.log("to delete :"+JSON.stringify(content))
      }
    })

  }


  onEditFile(selectedFile){
    this.editFileInfo = selectedFile;
    this.addOfResource();
  }




}
