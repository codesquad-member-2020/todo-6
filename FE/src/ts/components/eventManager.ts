import { columnClickHandler } from './column';
import { inputFormClickHandler, inputFormInputHandler } from './inputForm';
import { cardClickHandler, cardDoubleClickHandler } from './card';

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

const addAllEventListener = (target: HTMLElement): void => {
  target.addEventListener('click', clickHandler);
  target.addEventListener('dblclick', doubleClickHandler);
  target.addEventListener('input', inputHandler);
};

export default addAllEventListener;
