import { Directive, ElementRef, NgZone } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: 'swiper-container',
})
export class SwiperDirective {
  constructor(
    private slider: ElementRef<SwiperContainer>,
    private ngZone: NgZone
  ) {}
  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    this.ngZone.run(() => {
      this.slider.nativeElement.swiper.update();
      console.log('SWIPER RESIZE', { el: this.slider });
    });
  });

  private options: SwiperOptions = {
    updateOnWindowResize: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 1,
    pagination: false,
    navigation: false,
    scrollbar: false,
    observer: true,
    observeParents: true,
    lazyPreloadPrevNext: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
  };

  ngAfterViewInit() {
    Object.assign(this.slider.nativeElement, this.options);
    this.slider.nativeElement.initialize();

    this.resizeObserver.observe(this.slider.nativeElement);
  }
}
