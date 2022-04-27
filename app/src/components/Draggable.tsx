import { defineComponent, ref } from 'vue';
import type { VNode, PropType } from 'vue';

import { DragValue } from '../object/DragValue';
import { deepMerge } from '../util/deepMerge';

function addPropsToVNode(vNode: VNode, props: Record<string, any>): VNode {
  vNode.props = deepMerge(vNode.props, props);
  return vNode;
}

function useDrag({
  onDragstart,
  onDragend,
}: {
  onDragstart?: () => void;
  onDragend?: (vec: [number, number]) => void;
}) {
  const value = new DragValue();
  const diffX = ref(0);
  const diffY = ref(0);
  const handlers = {
    onDragstart: (e: DragEvent) => {
      value.start(e);
      onDragstart && onDragstart();
    },
    onDrag: (e: DragEvent) => {
      value.updated(e);
      diffX.value = value.getDiffX();
      diffY.value = value.getDiffY();
    },
    ondragend(e: DragEvent) {
      value.updated(e);
      onDragend && onDragend([value.getDiffX(), value.getDiffY()]);
    },
  };

  return {
    handlers,
    diffX,
    diffY,
  };
}

export const Draggable = defineComponent({
  props: {
    initialPosition: {
      type: Array as any as PropType<[number, number]>,
    },
    onDragstart: {
      type: Function as PropType<() => void>,
    },
    onDragend: {
      type: Function as PropType<(vec: [number, number]) => void>,
    },
  },
  setup(props, { slots }) {
    const { handlers, diffX, diffY } = useDrag({
      onDragstart: props.onDragstart,
      onDragend: props.onDragend,
    });

    return () => {
      let vNode = slots.default!()[0];
      vNode = addPropsToVNode(vNode, {
        ...handlers,
        // onClick: props.onClick,
        Draggable: true,
        style: {
          position: 'absolute',
          top: `${props.initialPosition?.[1] || 0}px`,
          left: `${props.initialPosition?.[0] || 0}px`,
          transform: `translate(${diffX.value}px, ${diffY.value}px)`,
        },
      });

      return vNode;
    };
  },
});
