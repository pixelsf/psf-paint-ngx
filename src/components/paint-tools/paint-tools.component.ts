import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { PaintStatesService } from "../../providers/paint-states.service";

@Component({
  selector: 'app-paint-tools',
  templateUrl: './paint-tools.component.html',
  styleUrls: ['./paint-tools.component.scss']
})
export class PaintToolsComponent implements OnInit {

  toolMode: string;
  palettecolors: string[] = [
    '#ff2121', '#e61c6e','#ffb3a7',
    '#efd700', '#e88b00','#bc763c',
    '#88cb7f', '#00552e','#00a497',
    '#2ca9e1', '#005789','#8d4bbb',
    '#602dae', '#f1bf99','#9c5333',
    '#000000', '#e9e2cf','#ffffff'
  ];
  protected readonly maxBrushSize: number = 40;
  protected readonly minBrushSize: number = 4;
  brushStyle: {"width": string, "height": string, "background-color": string};
  brushImgStyle: SafeStyle;

  constructor(protected sanitizer: DomSanitizer,
              public paintStates: PaintStatesService) {
    this.initPaintTools();
  }

  initPaintTools() {
    // init brush
    this.toolMode = 'brush';
    this.paintStates.brushSize = 15;
    this.paintStates.brushColor = this.palettecolors[0];
    this.updateBrushStyle();
  }

  updateBrushStyle() {
    this.brushStyle = {
      "width": this.paintStates.brushSize + "px",
      "height": this.paintStates.brushSize + "px",
      "background-color": this.paintStates.brushColor
    };
    this.brushImgStyle = this.toolMode === "eraser"? this.sanitizer.bypassSecurityTrustStyle("url('assets/img/paint-range-eraser-bcg.png')"): "none";
  }

  setToolMode(index: number, color?: string) {
    let toolModes = ['brush','eraser'];
    this.toolMode = toolModes[index];
    this.paintStates.setCanvasToolMode(this.toolMode);
    if (color) {
      this.setBrushColor(color);
    } else {
      this.updateBrushStyle();
      this.paintStates.updateCanvasStroke();
    }
  }

  setBrushColor(color: string) {
    this.paintStates.brushColor = color;
    this.updateBrushStyle();
  }

  whellToChangetBrushSize(e) {
    e = e || window.event;
    // IE chrome 使用 whelldelta, firefox 使用 detail
    let {data, isDetail} = e.wheelDelta? {data: e.wheelDelta, isDetail: false} : {data: e.detail, isDetail: true};
    if (data * (isDetail? -1: 1) > 0) {
      // 向上滚动
      console.log('上滚');
      this.paintStates.brushSize++;
      this.paintStates.brushSize = Math.min(this.maxBrushSize, this.paintStates.brushSize);
      this.updateBrushStyle();
    } else if (data * (isDetail? -1: 1) < 0) {
      // 向下滚动
      console.log('下滚');
      this.paintStates.brushSize--;
      this.paintStates.brushSize = Math.max(this.minBrushSize, this.paintStates.brushSize);
      this.updateBrushStyle();
    }
  }

  savePainting() {
    this.paintStates.savePainting();
  }

  clearCanvas() {
    this.paintStates.clearCanvas();
  }

  brushStateBackup() {
    console.log("brushStateBackup");
  }

  brushStateUpdate() {
    console.log("brushStateUpdate");
    this.paintStates.updateCanvasStroke();
  }

  ngOnInit(): void {
  }

}
