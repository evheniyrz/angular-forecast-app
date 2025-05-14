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
} from 'echarts/components';

import { EChartsOption } from 'echarts/types/dist/shared';
import { DatePipe, TitleCasePipe } from '@angular/common';

echarts.use([
  LineChart,
  DatasetComponent,
  TransformComponent,
  GridComponent,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
]);

@Component({
  selector: 'lib-weather-chart',
  imports: [NgxEchartsDirective],
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
            `{temperature|${item['temperature']}°C}\n{w|${item['time']}}\n{W|${item['weatherState']}}`
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
      left: 45,
      right: 45,
    },
    tooltip: {
      trigger: 'none',
      // axisPointer: { type: 'cross' },
    },
    legend: {},
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        interval: 0,
        align: 'center',
        lineHeight: 20,
        rich: {
          temperature: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          },
          w: {
            fontSize: 12,
            fontWeight: 400,
            color: 'rgba(255,255,255, 0.5)',
          },
          W: {
            fontSize: 10,
            fontWeight: 400,
            color: 'rgba(255,255,255, 0.5)',
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
