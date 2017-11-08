import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }


  getResourceIcon(extension){
    let link = '';

    if(extension == null){
      link = './assets/fileTypes/box.png'
      return link;
    }else if(extension.includes('.exe')){
      link = './assets/fileTypes/exe.png'
      return link;

    }else if(extension.includes('.pdf')){
      link = './assets/fileTypes/pdf.png'
      return link;

    }else if(extension.includes('.iso')){
      link = './assets/fileTypes/iso.png'
      return link;

    }else if(extension.includes('.csv')){
      link = './assets/fileTypes/csv.png'
      return link;

    }else if(extension.includes('.doc') || extension.includes('.odt') || extension.includes('.docx')){
      link = './assets/fileTypes/doc.png'
      return link;

    }else if(extension.includes('.html')){
      link = './assets/fileTypes/html.png'
      return link;

    }else if(extension.includes('.json')){
      link = './assets/fileTypes/json-file.png'
      return link;

    }else if(extension.includes('http')){
      link = './assets/fileTypes/html.png'
      return link;

    }else if(extension.includes('.mp3')){
      link = './assets/fileTypes/mp3.png'
      return link;

    }else if(extension.includes('.mp4')){
      link = './assets/fileTypes/mp4.png'
      return link;

    }else if(extension.includes('.ppt')){
      link = './assets/fileTypes/ppt.png'
      return link;

    }else if(extension.includes('.txt') ){
      link = './assets/fileTypes/txt.png'
      return link;

    }else if(extension.includes('.xls') || extension.includes('.xlsx') || extension.includes('.ods') ){
      link = './assets/fileTypes/xls.png'
      return link;

    }else if(extension.includes('.xml') ){
      link = './assets/fileTypes/xml.png'
      return link;

    }else if(extension.includes('.zip') ){
      link = './assets/fileTypes/zip.png'
      return link;

    }else {
      link = './assets/fileTypes/box.png'
      return link;
    }

  }




  getResourceIconForGridView(extension){
    let link = '';

    if(extension == null){
      link = './assets/fileType_grid/box.png'
      return link;
    }else if(extension.includes('.exe')){
      link = './assets/fileType_grid/exe.png'
      return link;

    }else if(extension.includes('.pdf')){
      link = './assets/fileType_grid/pdf.png'
      return link;

    }else if(extension.includes('.iso')){
      link = './assets/fileType_grid/iso.png'
      return link;

    }else if(extension.includes('.csv')){
      link = './assets/fileType_grid/csv.png'
      return link;

    }else if(extension.includes('.doc') || extension.includes('.odt') || extension.includes('.docx')){
      link = './assets/fileType_grid/doc.png'
      return link;

    }else if(extension.includes('.html')){
      link = './assets/fileType_grid/html.png'
      return link;

    }else if(extension.includes('.json')){
      link = './assets/fileType_grid/json-file.png'
      return link;

    }else if(extension.includes('http')){
      link = './assets/fileType_grid/html.png'
      return link;

    }else if(extension.includes('.mp3')){
      link = './assets/fileType_grid/mp3.png'
      return link;

    }else if(extension.includes('.mp4')){
      link = './assets/fileType_grid/mp4.png'
      return link;

    }else if(extension.includes('.ppt')){
      link = './assets/fileType_grid/ppt.png'
      return link;

    }else if(extension.includes('.txt') ){
      link = './assets/fileType_grid/txt.png'
      return link;

    }else if(extension.includes('.xls') || extension.includes('.xlsx') || extension.includes('.ods') ){
      link = './assets/fileType_grid/xls.png'
      return link;

    }else if(extension.includes('.xml') ){
      link = './assets/fileType_grid/xml.png'
      return link;

    }else if(extension.includes('.zip') ){
      link = './assets/fileType_grid/zip.png'
      return link;

    }else {
      link = './assets/fileType_grid/box.png'
      return link;
    }

  }




}
