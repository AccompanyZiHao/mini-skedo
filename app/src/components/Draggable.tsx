import { defineComponent, ref } from 'vue';
import type { VNode, PropType } from 'vue';

import { DragValue } from '../object/DragValue';
import { deepMerge } from '../util/deepMerge';

function addPropsToVNode(vNode: VNode, props: Record<string, any>): VNode {
  vNode.props = deepMerge(vNode.props, props);
  return vNode;
}

function useDrag() {
  const value = new DragValue();
  const diffX = ref(0);
  const diffY = ref(0);
  const handlers = {
    onDragstart: (e: DragEvent) => {
      value.start(e);
    },
    onDrag: (e: DragEvent) => {
      value.updated(e);
      diffX.value = value.getDiffX();
      diffY.value = value.getDiffY();
    },
    onDragend: (e: DragEvent) => {
      value.start(e);
    },
  };

  return {
    handlers,
    diffX,
    diffY,
  };
}

export const Draggable = defineComponent({
  setup(props, { slots }) {
    const { handlers, diffX, diffY } = useDrag();

    return () => {
      let vNode = slots.default!()[0];
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        // onClick: props.onClick,
        Draggable: true,
        style: {
          transform: `translate(${diffX.value}px, ${diffY.value}px)`,
        },
      });

      return vNode;
    };
  },
});
