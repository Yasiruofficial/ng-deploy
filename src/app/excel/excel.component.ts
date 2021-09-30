import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent{

  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;

  constructor(private http: HttpClient) { }


  onFileChange(ev : any) {
    let workBook : any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial : any, name : any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});


      var res = [];

      for(var i in jsonData)
            res.push(jsonData[i]);

      res[0].forEach( (e:any) => {

        console.log(e['Item Code']);

        this.http.get("https://www.phonepola.com/en/catalogsearch/result/?q=P800011710",{responseType: 'text'}).subscribe( (data : any) => {
          console.log(data.search("Your search returned no results"));
        })

        // https://www.phonepola.com/en/catalogsearch/result?q=P800011710
        // Your search returned no results.
      })


      this.setDownload(jsonData);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data:any) {
    this.willDownload = true;
    setTimeout(() => {
      const el : any = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

}


interface IResponse{

    "Item Code": String,
    "Item Internal ID":String,
    "Magento Item Name":String,
    "Magento 2 Device Manufacture":String,
    "Acc Type":String,
    "Product type ":String,
    "Item Type ":String,
    "MAGENTO_CONFIGURABLE_VARIATIONS":String,
    "MAGENTO 2 PRODUCT TYPE":String,
    "TECHNICAL EXPERT":String,
    "Magento1 Websites":String,
    "Magento1 Attribute Set":String,
    "Magento1 Item Visibility":String,
    "Is Magento1 Item":String,
    "Item Status":String,
    "Currency":String,
    "Quantity":String,
    "Item Weight":String,
    "Item Weight Unit":String,
    "Magento1 Item Categories":String,
    "Magento1 Manage Stock":String,
    "Featured Product":String,
    "Price Level":String,
    "Online Price":String,
    "PRODUCT SPECIFICATION":String

}
