import { defineComponent } from 'vue';
import { Draggable } from './components/Draggable';
export default defineComponent({
  // components: {
  //   Draggable,
  // },
  setup() {
    return () => (
      <Draggable>
        <div
          style={{
            width: '100px',
            height: '100px',
            background: 'red',
          }}
        >
        </div>
      </Draggable>
    );
  },
});
