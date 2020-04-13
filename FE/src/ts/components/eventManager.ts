import { columnClickHandler } from './column';
import { inputFormClickHandler, inputFormInputHandler } from './inputForm';
import { cardClickHandler, cardDoubleClickHandler } from './card';

export const clickHandler = (event: Event): void => {
  columnClickHandler(event);
  inputFormClickHandler(event);
  cardClickHandler(event);
};

export const doubleClickHandler = (event: Event): void => {
  cardDoubleClickHandler(event);
};

export const inputHandler = (event: Event): void => {
  inputFormInputHandler(event);
};
