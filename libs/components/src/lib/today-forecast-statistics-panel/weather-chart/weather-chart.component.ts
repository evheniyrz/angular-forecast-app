import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  linkedSignal,
  WritableSignal,
} from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent } from 'echarts/components';
import {
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
} from 'echarts/components';

import { EChartsOption } from 'echarts/types/dist/shared';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChartResizeDirective } from 'libs/components/src/lib/today-forecast-statistics-panel/weather-chart/chart-resize/chart-resize.directive';

echarts.use([
  LineChart,
  DatasetComponent,
  TransformComponent,
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
]);

@Component({
  selector: 'lib-weather-chart',
  imports: [NgxEchartsDirective, ChartResizeDirective],
  providers: [provideEchartsCore({ echarts }), DatePipe, TitleCasePipe],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherChartComponent {
  readonly chartData: InputSignal<Array<Record<string, string | number>>> =
    input.required<Array<Record<string, string | number>>>();

  readonly chartOptionsSignal: WritableSignal<EChartsOption> = linkedSignal<
    Array<Record<string, string | number>>,
    EChartsOption
  >({
    source: this.chartData,
    computation: (newSource, _) => ({
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        data: newSource.map(
          (item) =>
            `{temperature|${item['temperature']}°C}\n{time|${item['time']}}\n{date|${item['date']}}\n{state|${item['weatherState']}}`
        ),
      },
      series: {
        type: 'line',
        color: 'white',
        smooth: true,
        symbolSize: 0,
        lineStyle: {
          color: 'orange',
          width: 4,
          type: 'solid',
        },
        encode: {
          x: 'time',
          y: 'temperature',
        },
        data: newSource.map((item) => item['temperature']),
      },
    }),
  });

  private chartOptions: EChartsOption = {
    grid: {
      top: 10,
      left: 45,
      right: 45,
      bottom: 90,
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        height: 10,
        bottom: 10,
        start: 0,
        end: 50,
        filterMode: 'empty',
        handleLabel: {
          show: false,
        },
        showDetail: false,
      },
      {
        type: 'inside',
        xAxisIndex: 0,
      },
    ],

    tooltip: {
      trigger: 'none',
      // axisPointer: { type: 'cross' },
    },
    legend: {},
    xAxis: {
      type: 'category',
      position: 'bottom',
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
        align: 'center',

        rich: {
          temperature: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 20,
          },
          time: {
            fontSize: 12,
            fontWeight: 400,
            color: 'rgba(255,255,255, 0.5)',
            lineHeight: 12,
          },
          date: {
            fontSize: 10,
            fontWeight: 400,
            color: 'rgba(255,255,255, 0.5)',
            lineHeight: 10,
          },
          state: {
            fontSize: 10,
            fontWeight: 400,
            color: 'rgba(255,255,255, 0.5)',
            lineHeight: 12,
          },
        },
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: 'transparent',
        },
      },
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: {
      type: 'line',
      color: 'white',
      smooth: true,
      symbolSize: 0,
      lineStyle: {
        color: 'orange',
        width: 4,
        type: 'solid',
      },
      encode: {
        x: 'time',
        y: 'temperature',
      },
      data: [],
    },
  };
  chartStyle = {
    width: '100%', // Чарт растягивается на 100% ширины родителя
  };
}
