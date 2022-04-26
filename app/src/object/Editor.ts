import { States, Actions, Meta } from './editor.types';
import { Topics } from './Topics';
import { Node } from './Node';
import StateMachine from './StateMachine';

export class Editor extends StateMachine<States, Actions, Topics> {
  private root: Node;

  constructor() {
    // 设置状态机开始状态
    super(States.Start);
    this.root = new Node('root', 0, 0, 20, 10);

    this.describeAddComponent();
  }

  private describeAddComponent() {
    let componentToPlace: Meta | null = null;
    let addVector: [number, number] = [0, 0];

    // 开始拖拽动作
    this.register(
      States.Start,
      States.PlacingComponent,
      Actions.StartAddComponent,
      (meta) => {
        componentToPlace = meta;
      }
    );

    // 拖拽平移
    this.register(
      States.PlacingComponent,
      States.PlacingComponent,
      Actions.EvtDrag,
      (vec: [number, number]) => {
        addVector = vec;
        // console.log('handle, ', vec)
      }
    );

    // 拖拽结束
    this.register(
      States.PlacingComponent,
      States.AddingComponent,
      Actions.EvtDrop,
      () => {
        if (!componentToPlace) {
          throw new Error('no component to create');
        }
        console.log('component drop');
        const node = new Node(
          componentToPlace.type,
          addVector[0] - componentToPlace.w / 2 - 100,
          addVector[1] - componentToPlace.h / 2,
          componentToPlace.w,
          componentToPlace.h
        );

        this.root.add(node);
        this.root.emit(Topics.NodeChildrenUpdated);
      }
    );

    // / 操作完成之后状态复原
    // States.AddingComponent -> States.Start
    this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
      console.log('auto reset state');
    });
  }

  public getRoot() {
    return this.root;
  }
}
