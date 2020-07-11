import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleToSafeStylePipe, UrlToBcgImageStylePipe } from '../providers/custom-pipes.pipe';
import { PaintCanvasComponent } from '../components/paint-canvas/paint-canvas.component';
import { PaintToolsComponent } from '../components/paint-tools/paint-tools.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    PaintCanvasComponent,
    PaintToolsComponent,
    StyleToSafeStylePipe,
    UrlToBcgImageStylePipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
