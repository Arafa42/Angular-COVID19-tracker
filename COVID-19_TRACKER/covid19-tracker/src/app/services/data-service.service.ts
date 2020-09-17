import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import { DataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

private dataURL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/archived_data/archived_daily_case_updates/02-14-2020_1123.csv";

  constructor(private http:HttpClient) { }

getData(){
return this.http.get(this.dataURL, {responseType: "text"}).pipe(
  map(res => {  
    let rows = res.split("\n");
    let raw = {};
    rows.splice(0,1);
    rows.forEach(row=>{
    let cols = row.split(/,(?=\S)/);


    let cs = {
        country: cols[1],
        confirmed: +cols[3],
        deaths: +cols[4],
        recovered: +cols[5]    
    };
 
    let temp : DataSummary = raw[cs.country];
    
    if(temp){
      temp.country = cs.country + temp.country;
      temp.confirmed = cs.confirmed + temp.confirmed;
      temp.deaths = cs.deaths + temp.deaths;
      temp.recovered = cs.recovered + temp.recovered;  
      
      raw[cs.country] = temp;
    }
    else{
      raw[cs.country] = cs;
    }
    })
    return <DataSummary[]>Object.values(raw);}))
}

}
