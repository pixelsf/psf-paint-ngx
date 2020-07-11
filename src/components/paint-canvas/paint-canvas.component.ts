import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PaintStatesService } from "../../providers/paint-states.service";

@Component({
  selector: 'app-paint-canvas',
  templateUrl: './paint-canvas.component.html',
  styleUrls: ['./paint-canvas.component.scss']
})
export class PaintCanvasComponent implements OnInit {

  @ViewChild('canvasContainerRef') private canvasContainerRef: ElementRef;
  @ViewChild('canvasRef') private canvasRef: ElementRef;

  private windowResize: EventListener;
  private canvasMouseDown: EventListener;
  private pageMouseMove: EventListener;
  private pageMouseUp: EventListener;
  private canvasTouchStart: EventListener;
  private canvasTouchMove: EventListener;

  private isDrawing = false;
  private preXInCanvas = -10;
  private preYInCanvas = -10;

  constructor(public elementRef: ElementRef,
              public paintStates: PaintStatesService) { }

  initCanvas(){
    this.paintStates.registerCanvas(this.canvasRef.nativeElement);
    let canvasSize = this.canvasContainerRef.nativeElement.clientWidth;
    this.canvasRef.nativeElement.width = canvasSize;
    this.canvasRef.nativeElement.height = canvasSize;
    this.paintStates.updateCanvasStroke();
    this.initPaintListener();
    this.addListener();
  }


  // painting event listener
  initPaintListener() {
    this.windowResize = this.onWindowResize.bind(this);
    this.canvasMouseDown = this.onCanvasMouseDown.bind(this);
    this.pageMouseMove = this.onPageMouseMove.bind(this);
    this.pageMouseUp = this.onPageMouseUp.bind(this);
    this.canvasTouchStart = this.onCanvasTouchStart.bind(this);
    this.canvasTouchMove = this.onCanvasTouchMove.bind(this);
  }

  destroyPaintListener() {
    this.windowResize = null;
    this.canvasMouseDown = null;
    this.pageMouseMove = null;
    this.pageMouseUp = null;
    this.canvasTouchStart = null;
    this.canvasTouchMove = null;
  }

  addListener() {
    window.addEventListener("resize", this.windowResize, false);
    this.canvasContainerRef.nativeElement.addEventListener("mousedown", this.canvasMouseDown, false);
    this.elementRef.nativeElement.addEventListener("mousemove", this.pageMouseMove, false);
    this.elementRef.nativeElement.addEventListener("mouseup", this.pageMouseUp, false);
    this.canvasContainerRef.nativeElement.addEventListener("touchstart", this.canvasTouchStart, false);
    this.canvasContainerRef.nativeElement.addEventListener("touchmove", this.canvasTouchMove, false);
  }

  removeListener() {
    window.removeEventListener("resize", this.windowResize, false);
    this.canvasContainerRef.nativeElement.removeEventListener("mousedown", this.canvasMouseDown, false);
    this.elementRef.nativeElement.removeEventListener("mousemove", this.pageMouseMove, false);
    this.elementRef.nativeElement.removeEventListener("mouseup", this.pageMouseUp, false);
    this.canvasContainerRef.nativeElement.removeEventListener("touchstart", this.canvasTouchStart, false);
    this.canvasContainerRef.nativeElement.removeEventListener("touchmove", this.canvasTouchMove, false);
  }

  // painting event
  /*
  * 当窗口大小变化时同时调整画布canvas大小
  * 使用重绘的方式，缺点是多次改变大小后画面会越来越模糊
  * */
  onWindowResize() {
    let canvasSize = this.canvasContainerRef.nativeElement.clientWidth;
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.canvasRef.nativeElement.width;
    tempCanvas.height = this.canvasRef.nativeElement.height;
    let tempContent = tempCanvas.getContext("2d");
    tempContent.drawImage(this.canvasRef.nativeElement,0,0);
    this.canvasRef.nativeElement.width = canvasSize;
    this.canvasRef.nativeElement.height = canvasSize;
    let context = this.canvasRef.nativeElement.getContext('2d');
    context.drawImage(tempCanvas,0,0,canvasSize,canvasSize);
    tempCanvas = null;
    tempContent = null;
    context = null;
    this.paintStates.updateCanvasStroke();
    // console.log("onWindowResize");
  }

  onCanvasMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    // //记录鼠标按下时的坐标做画线的起始坐标
    let rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.updatePrePosition(event.clientX - rect.left, event.clientY - rect.top);
    this.drawPath(this.preXInCanvas, this.preYInCanvas);
    // console.log("onCanvasMouseDown");
  }

  onCanvasTouchStart(event: TouchEvent) {
    if (event.targetTouches.length == 1) {
      let rect = this.canvasRef.nativeElement.getBoundingClientRect();
      let touch = event.targetTouches[0];
      this.updatePrePosition(touch.pageX - rect.left, touch.pageY - rect.top);
      this.drawPath(this.preXInCanvas, this.preYInCanvas);
      // console.log("onCanvasTouchStart");
    }
  }

  onPageMouseMove(event: MouseEvent) {
    if (this.isDrawing) {
      let rect = this.canvasRef.nativeElement.getBoundingClientRect();
      let curX = event.clientX - rect.left;//获取鼠标在canvs中的坐标
      let curY = event.clientY - rect.top;
      this.drawPath(curX, curY);
      this.updatePrePosition(curX, curY);
      // console.log("onPageMouseMove");
    }
  }

  onCanvasTouchMove(event: TouchEvent) {
    let rect = this.canvasRef.nativeElement.getBoundingClientRect();
    let touch = event.touches[0];
    let curX = touch.pageX - rect.left;
    let curY = touch.pageY - rect.top;
    this.drawPath(curX, curY);
    this.updatePrePosition(curX, curY);
    // console.log("onCanvasTouchMove");
  }

  onPageMouseUp(event: MouseEvent) {
    this.isDrawing = false;
    // console.log("onPageMouseUp");
  }

  drawPath(curXInCanvas: number, curYInCanvas: number) {
    let context = this.canvasRef.nativeElement.getContext('2d');
    context.beginPath();
    context.moveTo(this.preXInCanvas, this.preYInCanvas);
    context.lineTo(curXInCanvas, curYInCanvas);
    context.stroke();
    context = null;
  }

  updatePrePosition(curXInCanvas: number, curYInCanvas: number) {
    this.preXInCanvas = curXInCanvas;
    this.preYInCanvas = curYInCanvas;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }
}
