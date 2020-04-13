import { columnClickHandler } from './column';
import { inputFormClickHandler, inputFormInputHandler } from './inputForm';
import { cardClickHandler } from './card';

export const clickHandler = (event: Event): void => {
  columnClickHandler(event);
  inputFormClickHandler(event);
  cardClickHandler(event);
};

export const inputHandler = (event: Event): void => {
  inputFormInputHandler(event);
};
