import { Injectable } from '@angular/core';
import { Utils } from "./Utils"

@Injectable({
  providedIn: 'root'
})
export class PaintStatesService {
  public brushSize: number;
  private _brushColor: string;
  get brushColor() {
    return this._brushColor;
  }

  set brushColor(color: string) {
    this._brushColor = color;
    this.updateCanvasStroke();
  }

  private canvasElement: HTMLCanvasElement;

  constructor() { }

  registerCanvas(canvasElement) {
    this.canvasElement = canvasElement;
  }

  setCanvasToolMode(toolMode: string, color?: string) {
    // canvas
    let context = this.canvasElement.getContext('2d');
    switch (toolMode) {
      case 'brush':
        context.globalCompositeOperation = "source-over";
        context.strokeStyle = this.brushColor;
        break;
      case 'eraser':
        context.globalCompositeOperation = "destination-out";
      break;
    }
  }

  updateCanvasStroke() {
    if (this.canvasElement == null) return;
    let context = this.canvasElement.getContext('2d');
    context.strokeStyle = this.brushColor;
    context.lineWidth = this.brushSize;
    context.lineCap = "round";
  }

  clearCanvas() {
      let canvasSize = this.canvasElement.clientWidth;
      let context = this.canvasElement.getContext('2d');
      context.clearRect(0,0,canvasSize,canvasSize);
  }

  savePainting() {
    let outputCanvas = document.createElement('canvas');
    let context = outputCanvas.getContext("2d");
    outputCanvas.width = this.canvasElement.width;
    outputCanvas.height = this.canvasElement.height;
    context.fillStyle = "#FFFFFF";
    context.fillRect( 0, 0, outputCanvas.width, outputCanvas.height);
    context.drawImage(this.canvasElement, 0, 0, outputCanvas.width, outputCanvas.height);
    let dataURL = outputCanvas.toDataURL("image/png");
    let targetFileName = `paint_${Utils.getRandomFileNameWithoutExtension()}.png`;
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = dataURL;
    a.download = targetFileName;
    a.click();
    console.log("download");
    // a.remove();
  }
}
