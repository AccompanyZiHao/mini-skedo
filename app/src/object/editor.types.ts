export enum States {
  Start,
  DragStart,
  Moving,
  Stoped,
  Selected,
  PlacingComponent,
  AddingComponent
}

export enum Actions {
  AUTO = '<auto>',
  EvtDragStart = 0,
  EvtDrag,
  EvtDrop,
  EvtDragEnd,
  StartAddComponent,
  SelectedComponent,
}

export type Meta = {
  type: string;
  w: number;
  h: number;
};
