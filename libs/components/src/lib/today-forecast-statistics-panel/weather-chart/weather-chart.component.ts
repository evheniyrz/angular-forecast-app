import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
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

import { EChartsOption, XAXisOption } from 'echarts/types/dist/shared';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MonoTypeOperatorFunction, tap } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { WeatherollectionResponse } from '@lib-services';

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
  @ViewChild(NgxEchartsDirective, { static: true })
  chartDirective!: NgxEchartsDirective;
  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef<HTMLElement>;
  @Input() weatherResponse!: WeatherollectionResponse;
  private http: HttpClient = inject(HttpClient);
  private destroyFn: MonoTypeOperatorFunction<any> = takeUntilDestroyed();
  private date: DatePipe = inject(DatePipe); //shortTime
  private titleCasePipe: TitleCasePipe = inject(TitleCasePipe);

  chartOptions: EChartsOption = {
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
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     xAxisIndex: 0,
    //     filterMode: 'none',
    //   },
    //   {
    //     type: 'inside',
    //     xAxisIndex: 0,
    //     filterMode: 'none',
    //   },
    // ],
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
    },
  };
  chartStyle = {
    width: '100%', // Чарт растягивается на 100% ширины родителя
  };

  ngOnInit() {
    console.log('==chart-directive', this.chartContainer);
    const tempDiagramm = echarts.init(this.chartContainer.nativeElement);
    // tempDiagramm.showLoading();
    this.http
      .get('/assets/chart-data.json')
      .pipe(
        this.destroyFn,
        tap((data) => {
          const keyValueChartData = this.transformDataToChartData(data);

          // tempDiagramm.hideLoading();
          tempDiagramm.setOption({
            ...this.chartOptions,
            xAxis: {
              ...this.chartOptions.xAxis,
              data: keyValueChartData.map(
                (item) =>
                  `{temperature|${item['temperature']}°C}\n{w|${item['time']}}\n{W|${item['weatherState']}}`
              ),
            },
            series: {
              ...this.chartOptions.series,
              data: keyValueChartData.map((item) => item['temperature']),
            },
          });

          const options: EChartsOption =
            tempDiagramm.getOption() as EChartsOption;
          console.log('==options==', options);
        })
      )
      .subscribe({
        complete: () => console.log('complete'),
      });
  }

  private transformDataToChartData(
    data: WeatherollectionResponse
  ): Array<Record<string, string | number>> {
    const chartData: Array<Record<string, string | number>> = data.list.reduce<
      Array<Record<string, string | number>>
    >((collection, next) => {
      collection.push({
        time: this.date.transform(next.dt_txt, 'shortTime') as string,
        temperature: Math.round(next.main.temp),
        weatherState: this.titleCasePipe.transform(next.weather[0].description),
      });
      return collection;
    }, []);

    return chartData;
  }
}
