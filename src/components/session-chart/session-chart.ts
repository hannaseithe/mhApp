import { Component, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
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
  @ViewChild('myCanvas') canvas; 
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

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  renderChart() {
    console.log('renderChart()');
    console.log('this.data', this.data);
    console.log('this', this);
    try {
      if (this.data) {
        let datasets = [];
        let labels = [];
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
            label: fearStep.name,
            data: dataArray,
            borderColor: this.getRandomColor(),
            fill: false
          }];
        })
        this.chart = new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            datasets: datasets
          },
          options: {
            scales: {
              xAxes:  [{
                type: 'time',
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Date'
                },
                ticks: {
                  major: {
                    fontStyle: 'bold',
                    fontColor: '#FF0000'
                  }
                }
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
