import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Fear } from '../../models/fear.model';
import { FearStep } from '../../models/fearStep.model';
import { Session } from '../../models/session.model';
import { DatabaseProvider } from '../../providers/database/database';

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

  constructor(private database: DatabaseProvider) {
  }

  ngOnChanges() {
    if (this.data) {
      let datasets = [];
      this.data.forEach((fearStep) => {
        let dataArray = [{
          x: fearStep.initialDegree,
          y: fearStep.creationDate
        }];
        fearStep.sessionLogs.forEach((sessionLog) => {
          dataArray = [...dataArray, {
            x: sessionLog.endDegree,
            y: sessionLog.date
          }]
        })
        datasets = [...datasets, {
          data: dataArray,
          borderColor: "#112233",
          fill: false
        }];
      })
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: [],
          datasets: datasets
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    }
    
  }

}
