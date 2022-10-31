import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Chart, ChartDataSets, ChartData, ChartOptions } from "chart.js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  chart: Chart;
  dataLeft: ChartDataSets = [
    292.67, 292.82, 292.54, 292.54, 292.95, 292.41, 292.68, 292.27, 292.41,
    292.21, 292.37, 292.5,
  ];
  dataRight: ChartDataSets = [
    21.43, 21.43, 26.78, 16.07, 16.07, 10.71, 10.71, 21.43, 5.36, 10.71, 5.36,
    10,
  ];
  ngOnInit() {
    // CHARTDATASET CONFIGURATION
    const datasets: ChartDataSets[] = [
      {
        label: "Fan page",
        fill: false,
        data: this.dataLeft,
        backgroundColor: "#4C4CD8",
        borderColor: "#4C4CD8",
        borderWidth: 1,
        yAxisID: "Fan page",
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "#2a2a9e", //SE LOGRA EL EFECTO DESEADO MODIFICANDO EL RADIUS Y EL COLOR DEL FONDO DEL PUNTO
        pointHoverBorderColor: "#4c4cd8a1",
        pointHoverBorderWidth: 10,
      },
      {
        label: "Engaged users",
        fill: false,
        data: this.dataRight,
        backgroundColor: "#F8CB1C",
        borderColor: "#F8CB1C",
        borderWidth: 1,
        yAxisID: "Engaged users",
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "#A88911", //SE LOGRA EL EFECTO DESEADO MODIFICANDO EL RADIUS Y EL COLOR DEL FONDO DEL PUNTO
        pointHoverBorderColor: "#f8cb1c85",
        pointHoverBorderWidth: 10,
      },
    ];

    // CHARTDATA
    const data: ChartData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      datasets,
    };

    // CHARTOPTIONS
    const options: ChartOptions = {
      responsive: true,
      legend: {
        display: false,
      },
      onHover: (e, items) => {
        this.pointHover(items); // OBTENEMOS EL CHART ELEMENT AL PASAR POR LOS PUNTOS
      },
      hover: {
        mode: "nearest", // SOLO HACEMOS HOVER SOBRE EL PUNTO SEÑALADO
        intersect: true,
        animationDuration: 0,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: (value) => {
                return value;
              },
              fontColor: "#fff",
              fontSize: 12,
              fontFamily: "Work Sans",
              padding: 6,
            },
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            id: "Fan page",
            position: "left",
            ticks: {
              stepSize:
                (Math.max(...this.dataLeft) - Math.min(...this.dataLeft)) / 10, // DIVIDIMOS EN PARTES
              maxTicksLimit: 7, // LIMITAMOS A MAXIMO 7
              fontColor: "#EBEBEB",
              padding: 15,
              fontSize: 10,
              fontFamily: "Work Sans",
              callback: (value: string, index, values) => {
                const newValue = parseFloat(value).toFixed(2);
                return newValue + " K";
              },
            },
            gridLines: {
              borderDash: [1, 2],
              color: "#282828",
              drawBorder: false,
              tickMarkLength: 0,
            },
          },
          {
            id: "Engaged users",
            position: "right",
            ticks: {
              stepSize:
                (Math.max(...this.dataRight) - Math.min(...this.dataRight)) /
                10, // DIVIDIMOS EN PARTES
              maxTicksLimit: 7, // LIMITAMOS A MAXIMO 7
              fontColor: "#fff",
              fontSize: 10,
              padding: 15,
              fontFamily: "Work Sans",
              callback: (value: string, index, values) => {
                const newValue = parseFloat(value).toFixed(2);
                return newValue;
              },
            },
            gridLines: {
              drawBorder: false,
              tickMarkLength: 0,
              color: "transparent",
            },
          },
        ],
      },
      tooltips: {
        enabled: false,
      },
    };

    // INIT GRAPH
    new Chart("grafica", {
      type: "line",
      data,
      options,
    });
  }

  pointHover(elements) {
    if (elements.length) {
      let element = elements;
      if (element[0]) {
        element = element[0];
        // GUARDAMOS EL PUNTO EN UNA VARIABLE
        const yPoint = element._model.y;
        //ASOCIAMOS EL EJE 5 DEL PUNTO AL LABELITEM DEL MISMO EJE
        const targetPoint = element._yScale._labelItems.reduce(function (
          previous,
          current
        ) {
          return Math.abs(current.y - yPoint) > Math.abs(previous.y - yPoint)
            ? previous
            : current;
        });

        //ASOCIAMOS EL PUNTO AL LABEL CORRESPONDIENTE DEL EJE X
        const xPointIndex = element._index;
        const xLabelItem = element._xScale._labelItems[xPointIndex];
        const pointColor = element._model.backgroundColor;

        //CREAMOS LOS NUEVOS LABELS QUE REEMPLAZARAN EN EL HOVER A LOS SELECCIONADOS
        const ctx = element._chart.ctx;
        const backgroundColor = "#1a1919";
        ctx.fillStyle = backgroundColor;
        let widthLabel = ctx.measureText(targetPoint.label).width;
        ctx.fillRect(targetPoint.x - 40, targetPoint.y - 5, widthLabel + 5, 15);
        ctx.fillStyle = pointColor;
        ctx.fillText(targetPoint.label, targetPoint.x - 40, targetPoint.y + 5);
        widthLabel = ctx.measureText(xLabelItem.label).width;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(xLabelItem.x - 10, xLabelItem.y, widthLabel + 5, 15);
        ctx.fillStyle = pointColor;
        ctx.fillText(xLabelItem.label, xLabelItem.x - 7, xLabelItem.y + 8);
      }
    }
  }
}
