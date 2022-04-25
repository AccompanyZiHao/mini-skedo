import { defineComponent } from 'vue';
import UIEditor from "./components/UIEditor";
export default defineComponent({
  // components: {
  //   Draggable,
  // },
  setup() {
    return () => (
      <UIEditor />
      // <Draggable>
      //   <div
      //     style={{
      //       width: '100px',
      //       height: '100px',
      //       background: 'red',
      //     }}
      //   >
      //   </div>
      // </Draggable>
    );
  },
});
