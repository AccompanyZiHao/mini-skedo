import Emiter from './Emiter';
import { Topics } from './Topics';
import { List, Map as ImmutableMap, } from 'immutable';

export class Node extends Emiter<Topics> {
  private nodeData: ImmutableMap<string, any>;
  constructor(type: string, x: number, y: number, w: number, h: number,) {
    super();
    this.nodeData = ImmutableMap({
      type,
      x,
      y,
      w,
      h,
      children: List<Node>(),
    })
  }

  public add(child: Node){
    this.nodeData = this.nodeData.update("children", (children: Array<Node>)=>{
      children.push(child)
      return children
    })
  }

  public getType() {
    return this.nodeData.get('type');
  }

  public getX() {
    return this.nodeData.get('x');
  }

  public getY() {
    return this.nodeData.get('y');
  }

  public getW() {
    return this.nodeData.get('w');
  }

  public getH() {
    return this.nodeData.get('h');
  }

  public getChildren() {
    return this.nodeData.get("children").toJS() as Node[];
  }

  public setXY(vec: [number, number]) {
    this.nodeData = this.nodeData.set("x", vec[0] + this.nodeData.get("left")).set("y", vec[1] + this.nodeData.get("top"));
  }
}
