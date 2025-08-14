import { Component, ChangeDetectionStrategy, model } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { ApiService } from '../../service/api.service';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';

@Component({
  selector: 'app-adminhome ',
  imports: [AdminheaderComponent,AdminsidebarComponent,MatCardModule, MatDatepickerModule,HighchartsChartComponent],
  providers: [],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
  // template: `
  //   <highcharts-chart
  //     [constructorType]="chartConstructor"
  //     [options]="chartOptions"
  //     [(update)]="updateFlag"
  //     [oneToOne]="oneToOneFlag"
  //     class="chart"
  //   />
  // `,

  // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AdminhomeComponent {
  downloadCount:number = 0
  userCount:number = 0
  recipeCount:number = 0
  notificationCount:number  = 0
  selected = model<Date | null>(null);
  chartOptions:any = {}

 // Required
  chartConstructor: ChartConstructorType = 'chart'; // Optional, defaults to 'chart'
  updateFlag: boolean = false; // Optional
  oneToOneFlag: boolean = true;

  constructor(private api:ApiService){
     this.chartOptions =   {

      chart: {
        type: 'bar'
    },
    title: {
        text: 'cookpedia Analytics'
    },
    // subtitle: {
    //     text: `Source: <a
    //         href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"
    //         target="_blank">Wikipedia.org</a>`
    // },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:'#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1990',
        data: [632, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2021',
        data: [1393, 1031, 4695, 745]
    }]

    };
  }

  ngOnInit(){
    this.bootSequence();
  }

  bootSequence(){
    this.api.getAllDownloads().subscribe({
      next:(res:any)=> {
        console.log(res)
        let count = res.map((item:any) => item.count )
        console.log(count)
         this.downloadCount = res.map((item:any) => Number(item.count))
        .reduce( (n1:any,n2:any) => n1+n2  )
       },
      error:(err:any) => console.log(err)
    })

    this.api.getAllUsersApi().subscribe({
      next:(res:any)=> {
        this.userCount = res.filter((user:any) => user.role!="admin").length;
      },
      error:(err:any) => console.log(err)
    })

    this.api.allRecipes()
    .subscribe({
      next:(res:any)=> { this.recipeCount = res.length},
      error:(err:any) => console.log(err)
    })

  }
}
