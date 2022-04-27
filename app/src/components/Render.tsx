import { defineComponent, inject, ref } from 'vue';
import { Node } from '../object/Node';
import classes from './drag-drop.module.less';
import { Topics } from '../object/Topics';
import { Draggable } from './Draggable';
import { Editor } from '../object/Editor';
import { Actions } from '../object/editor.types';

type SkedoComponent = {
  node: Node;
};

function Dummy({ render }: { render: () => JSX.Element }) {
  return render();
}

export const Render = defineComponent({
  props: {
    root: {
      type: Node,
      required: true,
    },
  },
  setup({ root }: { root: Node }) {
    const count = ref(0);
    root
      .on([
        Topics.NodeChildrenUpdated,
        Topics.NodePositionMoved,
        // Topics.NodeChildrenSelected,
      ])
      .subscribe(() => {
        count.value++;
      });
    return () => {
      return <Dummy key={count.value} render={() => NodeRender(root)} />;
    };
  },
});

function RenderItem(node: Node) {
  console.log('node :>> ', node);
  switch (node.getType()) {
    case 'image':
      return (
        <img
          src={
            'https://p26-passport.byteacctimg.com/img/user-avatar/4df5fcbe927ed531544e53686055b6e0~300x300.image'
          }
        />
      );
    case 'rect':
      return (
        <div
          style={{
            backgroundColor: 'red',
          }}
        />
      );
    case 'text':
      return <h2>这里是文本</h2>;
  }
}

const ItemRenderForDraggable = ({ node }: SkedoComponent) => {
  const editor = inject('editor') as Editor;
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      onDragstart={() => {
        editor.dispatch(Actions.EvtDragStart, node);
      }}
      onDragend={(vec) => {
        editor.dispatch(Actions.EvtDragEnd, vec);
      }}
      style={{
        width: `${node.getW()}px`,
        height: `${node.getH()}px`,
      }}
    >
      {RenderItem(node)}
    </Draggable>
  );
};

const RootEmpty = (editor: Editor) => {
  return (
    <div class={classes['root-empty']}>
      <p>啥都没有，添加一些拖拽组件吧</p>
    </div>
  );
};

const RootRender = (children: Node[], editor: Editor) => {
  return (
    <>
      {children.map((node, i) => {
        return <Render key={i} root={node} editor={editor} />;
      })}
    </>
  );
};

const Root = ({ node }: SkedoComponent, editor: Editor) => {
  const children = node.getChildren();
  return (
    <div data-skedo="root" class={classes['root']}>
      {/* {children.map((node, i) => {
        return <Render key={i} root={node} />;
      })} */}
      {children.length ? RootRender(children, editor) : RootEmpty(editor)}
    </div>
  );
};

function NodeRender(node: Node) {
  switch (node.getType()) {
    case 'root':
      return <Root node={node} />;
    case 'text':
    case 'rect':
    case 'image':
      return <ItemRenderForDraggable node={node} />;
    default:
      throw new Error(`unsupported node type:${node.getType()}`);
  }
}
