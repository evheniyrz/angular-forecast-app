import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';

@Directive({
  selector: '[libChartResize]',
})
export class ChartResizeDirective implements AfterViewInit, OnDestroy {
  @Output() resize = new EventEmitter<{ width: number; height: number }>();
  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    this.ngZone.run(() => {
      this.echartsDir.resize();
      const { width, height } = entries[0].contentRect;
      this.resize.emit({ width, height });
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
    this.resizeObserver.disconnect();
  }
}
