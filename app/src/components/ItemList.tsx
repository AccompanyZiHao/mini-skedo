import { ref } from 'vue';
import classes from "./drag-drop.module.less";
import Metas from './../object/Metas'
import { Actions } from "../object/editor.types";
import { Editor } from '../object/Editor';

export default ({editor}: {editor: Editor}) => {
  return (
    <div class={classes["item-list"]}>
      {Metas.map((item) => {
        return (
          <div
            draggable={true}
            onDragstart={(e) => {
              editor.dispatch(Actions.StartAddComponent, item);
            }}
            class={classes["item"]}
            key={item.title}
          >
            <span class={classes["item-title"]}>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};