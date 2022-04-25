// import Emiter from "./Emiter";
import { customRef } from 'vue';

export class DragValue {
  // customRef 不依赖 vue  react
  private startX: number = 0;
  private startY: number = 0;
  private diffX: number = 0;
  private diffY: number = 0;
  // constructor() {
  //   // super();
  // }
  start(e: DragEvent) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.diffX = 0;
    this.diffY = 0;
  }
  updated(e: DragEvent) {
    this.diffX = e.clientX - this.startX;
    this.diffY = e.clientY - this.startY;
  }
  getDiffX() {
    return this.diffX;
  }
  getDiffY() {
    return this.diffY;
  }
}
