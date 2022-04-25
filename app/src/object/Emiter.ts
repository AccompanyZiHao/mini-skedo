// import { Actions, States } from './editor.types';
// import { Node } from './Node';
// import StateMachine from './StateMachine';
// import { Topics } from './Topics';
// import { BoxMeta } from './BoxMeta';
// import ComponentMeta from './ComponentMeta';
// import { ComponentsLoader } from '../loader';

// export class Editor extends StateMachine<States, Actions, Topics> {
//   private root: Node;
//   private curNode: Node;
//   private loader: ComponentsLoader;
//   private id_base: number;

//   constructor(loader: ComponentsLoader) {
//     // 设置状态机开始状态
//     super(States.Start);
//     this.loader = loader;
//     const metaData = loader.loadByName('container', 'root');
//     const box = new BoxMeta({
//       left: 0,
//       top: 0,
//       width: 3200,
//       height: 3200,
//     });
//     this.root = new Node(metaData, metaData.createData(this.createId(), box));

//     this.describeAddComponent();
//     this.describeDrag();
//     this.describeSelect();
//   }

//   private describeDrag() {
//     let dragNode: Node;
//     this.register(
//       States.Start,
//       States.DragStart,
//       Actions.EvtDragStart,
//       (node: Node) => {
//         dragNode = node;
//       }
//     );

//     this.register(
//       States.DragStart,
//       States.Stoped,
//       Actions.EvtDragEnd,
//       (vec: [number, number]) => {
//         dragNode!.setXY(vec);
//         dragNode!.emit(Topics.NodePositionMoved);
//       }
//     );

//     this.register(States.Stoped, States.Start, Actions.AUTO, () => {});
//   }

//   /**
//    * 描述添加组件过程
//    */
//   private describeAddComponent() {
//     let componentToPlace: ComponentMeta | null = null;
//     let addVector: [number, number] = [0, 0];
//     // Start => StartAddComponent => PlacingComponent

//     // 开始拖拽动作
//     this.register(
//       States.Start,
//       States.PlacingComponent,
//       Actions.StartAddComponent,
//       (meta) => {
//         componentToPlace = meta;
//       }
//     );
//     // 拖拽平移操作
//     this.register(
//       States.PlacingComponent,
//       States.PlacingComponent,
//       Actions.EvtDrag,
//       (vec: [number, number]) => {
//         addVector = vec;
//       }
//     );
//     // 拖拽结束
//     this.register(
//       States.PlacingComponent,
//       States.AddingComponent,
//       Actions.EvtDrop,
//       () => {
//         if (!componentToPlace) {
//           throw new Error('no component to create');
//         }
//         const box = new BoxMeta({
//           left: addVector[0] - 100,
//           top: addVector[1],
//           width: componentToPlace.box.getW(),
//           height: componentToPlace.box.getH(),
//         });
//         const node = new Node(
//           componentToPlace,
//           componentToPlace.createData(this.createId(), box)
//         );

//         this.root.add(node);
//         this.root.emit(Topics.NodeChildrenUpdated);
//       }
//     );

//     this.register(States.AddingComponent, States.Start, Actions.AUTO, () => {
//       console.log('auto reset state');
//     });
//   }
//   private describeSelect() {
//     this.register(
//       States.Start,
//       States.Selected,
//       Actions.SelectedComponent,
//       (node: Node) => {
//         // 设置节点选中状态
//         node.setSelect(true);

//         this.curNode = node;
//         this.root.emit(Topics.NodeChildrenSelected);
//       }
//     );
//     this.register(States.Selected, States.Start, Actions.AUTO, () => {});
//   }
//   public getRoot() {
//     return this.root;
//   }
//   public getLoader() {
//     return this.loader;
//   }
//   public createId() {
//     return this.id_base++;
//   }
//   public getSelectNode(): Node {
//     return this.curNode;
//   }
// }
