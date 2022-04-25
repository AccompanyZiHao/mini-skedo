import { Topics } from './Topics'
import { Node } from './Node'

export class Editor {
  private root: Node

  constructor(){
    this.root = new Node('root', 0, 0, 10 ,10 )
  }

  public getRoot() {
    return this.root
  }
}