import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionChartComponent } from './session-chart/session-chart';
import { AnimationComponent } from './animation/animation';
@NgModule({
	declarations: [AnimationComponent, SessionChartComponent
    ],
	imports: [CommonModule],
	exports: [AnimationComponent, SessionChartComponent
    ]
})
export class ComponentsModule {}
