import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { FearStep } from '../../models/fearStep.model';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the SessionChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'session-chart',
  templateUrl: 'session-chart.html'
})
export class SessionChartComponent {

  @Input() data: any[];
  chart: any[] = [];
  fearSteps: FearStep[];

  constructor(private platform: Platform) {
    console.log('Constructor SessionStartComponent')
    this.platform.ready()
    .then(() => {
      console.log('device ready');
      try {
        setTimeout(this.renderChart,1000);
      }
      catch(error) {
        console.error(error)
      }
    })
  }

  renderChart() {
    console.log('renderChart()');
    try{
      this.chart = new Chart('myCanvas', {
      type: 'bar',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    }
    catch(error) {
      console.log(error)
    }
    
    console.log('this.chart', this.chart);
    /*   if (this.data) {
        let datasets = [];
        this.data.forEach((fearStep) => {
          let dataArray = [{
            x: fearStep.creationDate,
            y: fearStep.initialDegree
          }];
          fearStep.sessionLogs.forEach((sessionLog) => {
            dataArray = [...dataArray, {
              x: sessionLog.date, 
              y: sessionLog.endDegree
            }]
          })
          datasets = [...datasets, {
            data: dataArray,
            borderColor: "#112233",
            fill: false
          }];
        }) */
    /*     let datasets = [{
          data: [1, 3, 2, 5, 6],
          borderColor: "#112233",
          fill: false
        }] */

  }

  /*  } */

}
