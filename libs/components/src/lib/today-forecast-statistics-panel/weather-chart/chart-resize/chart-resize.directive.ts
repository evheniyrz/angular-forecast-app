import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Directive({
  selector: '[libChartResize]',
})
export class ChartResizeDirective implements AfterViewInit, OnDestroy {
  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    const { width } = entries[0].contentRect;
    this.ngZone.run(() => {
      const isSmall = width < 620;
      const newDataZoom = [{ end: isSmall ? 30 : 50 }];

      if (
        JSON.stringify(this.echartsDir.options!['datZoom']) !==
        JSON.stringify(newDataZoom)
      ) {
        this.echartsDir.merge = { dataZoom: newDataZoom };
        this.echartsDir.refreshChart();
      }

      this.echartsDir.resize();
    });
  });

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private echartsDir: NgxEchartsDirective
  ) {}

  ngAfterViewInit() {
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
