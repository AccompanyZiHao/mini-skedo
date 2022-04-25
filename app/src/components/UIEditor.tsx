import { defineComponent, provide } from 'vue';
import classes from './drag-drop.module.less';
import ItemList from './ItemList';
import { Panel } from './Panel';
import { Editor } from '../object/Editor';

export default defineComponent({
  setup() {
    const editor = new Editor();
    return () => {
      return (
        <div class={classes.page}>
          <ItemList editor={editor} />
          <Panel editor={editor} />
        </div>
      );
    };
  },
});
