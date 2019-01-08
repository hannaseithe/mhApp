import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionChartComponent } from './session-chart/session-chart';
@NgModule({
	declarations: [SessionChartComponent],
	imports: [CommonModule],
	exports: [SessionChartComponent]
})
export class ComponentsModule {}
