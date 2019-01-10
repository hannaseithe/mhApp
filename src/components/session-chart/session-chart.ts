import { Component, Input, ChangeDetectorRef } from '@angular/core';
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
        /* try {
          setTimeout(this.renderChart, 1000);
        }
        catch (error) {
          console.error(error)
        } */
      })
  }

  ngOnChanges() {
    let x = new Date();
    this.platform.ready()
      .then(() => {
        console.log('device ready');
         try {
          this.renderChart();
        }
        catch (error) {
          console.error(error)
        } 
      })
  }

  renderChart() {
    console.log('renderChart()');
    console.log('this.data', this.data);
    console.log('this', this);
    try {
      if (this.data) {
        let datasets = [];
        this.data.forEach((fearStep) => {
          let dataArray = [{
            x: new Date(fearStep.creationDate),
            y: fearStep.initialDegree
          }];
          fearStep.sessionLogs.forEach((sessionLog) => {
            dataArray = [...dataArray, {
              x: new Date(sessionLog.date),
              y: sessionLog.endDegree
            }]
          })
          datasets = [...datasets, {
            data: dataArray,
            borderColor: "#112233",
            fill: false
          }];
        })
        this.chart = new Chart('myCanvas', {
          type: 'line',
          data: {
            labels: [],
            datasets: datasets
          },
          options: {
            scales: {
              xAxes: [{
                type: 'time'
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    }
    catch (error) {
      console.log(error)
    }

    console.log('this.chart', this.chart);

  }

  /*  } */

}
