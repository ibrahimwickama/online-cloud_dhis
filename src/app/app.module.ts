import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MenuModule} from "../app/modules/menu/menu.module";
import {HttpProviderService} from "../app/services/http-provider.service";
import {UtilitiesService} from "../app/services/utilities.service";
import {FileViewerComponent} from "../app/components/file-viewer/file-viewer.component";
import {UploaderComponent} from "../app/components/uploader/uploader.component";
import {ListViewComponent} from "../app/components/list-view/list-view.component";
import {GridViewComponent} from "../app/components/grid-view/grid-view.component";
import {FormsModule} from "@angular/forms";
import { SharingSettingsComponent } from './components/sharing-settings/sharing-settings.component';
import {Router} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    ListViewComponent,
    UploaderComponent,
    FileViewerComponent,
    AppComponent,
    SharingSettingsComponent
  ],
  imports: [
    BrowserModule, MenuModule, FormsModule
  ],
  providers: [HttpProviderService,UtilitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
