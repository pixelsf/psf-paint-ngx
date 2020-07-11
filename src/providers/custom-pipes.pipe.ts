import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeStyle, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'styleToSafeStyle'})
export class StyleToSafeStylePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(style: string): SafeStyle {
    return style? this.sanitizer.bypassSecurityTrustStyle(style) : undefined;
  }
}

@Pipe({ name: 'urlToBcgImageStyle'})
export class UrlToBcgImageStylePipe implements PipeTransform {
  transform(url: string): SafeUrl {
    return url? "url('" + url + "')" : undefined;
  }
}