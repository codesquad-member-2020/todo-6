import { columnClickHandler } from './column';
import { inputFormClickHandler, inputFormInputHandler } from './inputForm';
import { cardClickHandler, cardDoubleClickHandler } from './card';
import { sideMenuEventListener } from './sidemenu';
import dragAndDropEvent from './dragAndDrop';
import headerEventListener from './header';

const clickHandler = (event: Event): void => {
  columnClickHandler(event);
  inputFormClickHandler(event);
  cardClickHandler(event);
};

const doubleClickHandler = (event: Event): void => {
  cardDoubleClickHandler(event);
};

const inputHandler = (event: Event): void => {
  inputFormInputHandler(event);
};

export const addAllEventListener = (target: HTMLElement): void => {
  target.addEventListener('click', clickHandler);
  target.addEventListener('dblclick', doubleClickHandler);
  target.addEventListener('input', inputHandler);
  headerEventListener();
  sideMenuEventListener();
};

export const addDragAndDropEvent = (target: HTMLElement): void => {
  dragAndDropEvent(target);
};
