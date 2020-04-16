import { columnClickHandler } from './column';
import { inputFormClickHandler, inputFormInputHandler } from './inputForm';
import { cardClickHandler, cardDoubleClickHandler } from './card';
import { sideMenuEventListener } from './sidemenu';
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

const addAllEventListener = (target: HTMLElement): void => {
  target.addEventListener('click', clickHandler);
  target.addEventListener('dblclick', doubleClickHandler);
  target.addEventListener('input', inputHandler);
  headerEventListener();
  sideMenuEventListener();
};

export default addAllEventListener;
