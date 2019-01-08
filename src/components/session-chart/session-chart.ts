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

  @Input() fearId: number;
  chart: [] = [];
  fear: Fear;
  fearSteps: FearStep[];

  constructor(private database: DatabaseProvider) {
    if (this.fearId) {
      database.isReady
        .then(() => {
          database.getFear(this.fearId)
            .then((fear) => this.fear = fear);
          database.getExtendedFearSteps(this.fearId)
            .then((result) => this.fearSteps = result.fearSteps);
        })
    }

  }

  ngOnChanges() {
    if (this.fearId) {
      this.database.isReady
        .then(() => {
          this.database.getFear(this.fearId)
            .then((fear) => this.fear = fear);
          this.database.getExtendedFearSteps(this.fearId)
            .then((result) => this.fearSteps = result.fearSteps);
        })
    }

  }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: "#3cba9f",
            fill: false
          }
        ]
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
