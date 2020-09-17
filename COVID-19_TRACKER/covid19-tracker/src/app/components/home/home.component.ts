import { Component, OnInit } from '@angular/core';
import { DataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalConfirmed = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  Gdata : DataSummary[];

  constructor(private data: DataServiceService) { }

  ngOnInit(): void {

    this.data.getData().subscribe({
      next: (result)=>{        
      console.log(result);
      this.Gdata = result;
      result.forEach(cs => {
        if(!Number.isNaN(cs.confirmed)){
        this.totalConfirmed += cs.confirmed;
        this.totalDeaths += cs.deaths;
        this.totalRecovered += cs.recovered;
        }
      })    
      }
    })

  }
}
