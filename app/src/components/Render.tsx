import { defineComponent, ref } from 'vue';
import { Node } from '../object/Node';
import classes from './drag-drop.module.less';
import { Topics } from '../object/Topics';
import { Draggable } from './Draggable';

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
  setup({ root }) {
    const count = ref(0);
    root
      .on([
        Topics.NodeChildrenUpdated,
        Topics.NodePositionMoved,
        Topics.NodeChildrenSelected,
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
  switch (node.getType()) {
    case 'image':
      return (
        <img
          src={ ''}
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
  return (
    <Draggable
      initialPosition={[node.getX(), node.getY()]}
      style={{
        width: `${node.getW()}px`,
        height: `${node.getH()}px`,
      }}
    >
      {RenderItem(node)}
    </Draggable>
  );
};

const Root = ({ node }: SkedoComponent) => {
  const children = node.getChildren();
  return (
    <div data-skedo="root">
      {children.map((node, i) => {
        return <Render key={i} root={node} />;
      })}
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
