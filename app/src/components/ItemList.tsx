import { ref } from 'vue';
import classes from "./drag-drop.module.less";
import Metas from './../object/Metas'

export default () => {
  return (
    <div class={classes["item-list"]}>
      {Metas.map((item) => {
        return (
          <div
            draggable={true}
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