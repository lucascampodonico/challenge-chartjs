import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('grafica', { static: true }) graficaREF: ElementRef;

  ngOnInit(){

    // CHARTDATASET CONFIGURATION
    const datasets:ChartDataSets[] = [
      {
        label: 'Fan page',
        fill: false,
        data: [292.67, 292.82, 292.54, 292.54, 292.95, 292.41, 292.68, 292.27, 292.41, 292.21, 292.37, 292.50],
        backgroundColor: '#4C4CD8',
        borderColor: '#4C4CD8',
        borderWidth : 1,
        yAxisID : 'Fan page',
        pointHoverRadius : 7,
        pointHoverBackgroundColor : '#4C4CD8',
        pointHoverBorderColor : '#4c4cd8a1',
        pointHoverBorderWidth : 10,
      },
      {
        label: 'Engaged users',
        fill: false,
        data: [21.43, 21.43, 26.78, 16.07, 16.07, 10.71, 10.71, 21.43, 5.36, 10.71, 5.36, 10],
        backgroundColor: '#F8CB1C',
        borderColor: '#F8CB1C',
        borderWidth : 1,
        yAxisID : 'Engaged users',
        pointHoverRadius : 7,
        pointHoverBackgroundColor : '#F8CB1C',
        pointHoverBorderColor : '#f8cb1c85',
        pointHoverBorderWidth : 10
      }
    ]

    // CHARTDATA
    const data : ChartData = {
      labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets
    }

    // CHARTOPTIONS
    const options : ChartOptions = {
      responsive : false,
      legend : {
        display : false
      },
      hover : {
        mode : 'x',
        intersect : false
      },
      scales : {
        xAxes : [
          {
            ticks : {
              fontColor : '#EBEBEB',
              callback : (value) => {
                return value
              },
              fontSize : 10,
              fontFamily : 'Work Sans',
              padding : 6
            },
            gridLines : {
              display : false,
            },
          },

        ],
        yAxes : [{
          id : 'Fan page',
          position : 'left',
          ticks : {
            fontColor : '#EBEBEB',
            padding : 15,
            fontSize : 10,
            fontFamily : 'Work Sans',
            callback : (value:string, index, values) => {
              const newValue = parseFloat(value).toFixed(2)
              return newValue + ' K'
            }
          },
          gridLines : {
            borderDash: [1, 2],
            color: "#282828",
            drawBorder: false,
            tickMarkLength : 0,
          }
        },
        {
          id : 'Engaged users',
          position : 'right',
          ticks : {
            fontColor : '#B8B7B7',
            fontSize : 10,
            padding : 15,
            fontFamily : 'Work Sans',
            callback : (value:string, index, values) => {
              const newValue = parseFloat(value).toFixed(2)
              return newValue
            },
          },
          gridLines : {
            drawBorder: false,
            tickMarkLength : 0,
            color: 'transparent'
          }
        }]
      },
      tooltips: {
        enabled: false,
        mode: 'x',
        intersect: false
      }
    }

    // INIT GRAPH
    new Chart('grafica', {
      type: 'line',
      data,
			options
    })

  }

}
