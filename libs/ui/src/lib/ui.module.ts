import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [SliderComponent, BannerComponent, GalleryComponent],
  exports: [SliderComponent, BannerComponent, GalleryComponent],
})
export class UiModule {}
