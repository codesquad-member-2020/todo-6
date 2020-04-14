import { addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { CARD_CLASS } from './card';

const mouseDownCard = ({ target }: Event): void => {
  if (!target.classList.contains(CARD_CLASS.card)) return;
  console.log(target);
  addClass(UTIL_CLASS.outlined, target);
};

const applyDragAndDrop = (target: HTMLElement): void => {
  target.addEventListener('mousedown', mouseDownCard);
};

export default applyDragAndDrop;
