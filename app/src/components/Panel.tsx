import { Editor } from "../object/Editor";
import { Render } from "./Render";
import classes from "./drag-drop.module.less";

export const Panel = ({ editor }: { editor: Editor }) => {
  return (
    <div
      class={classes.panel}
      onDragover={(e) => {
      }}
      onDrop = {e => {
      }}
    >
      <Render root={editor.getRoot()} />
    </div>
  );
};