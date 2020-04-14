import { _q, addClass, removeClass } from '../utils/utils';
import { UTIL_CLASS } from '../utils/constants';
import { CARD_CLASS } from './card';

const CONTAINER_CLASS = 'container';

const containerElement = _q(`.${CONTAINER_CLASS}`);

interface DragProperty {
  targetElement: any;
  cloneElement: any;
  isMousePressed: boolean;
  currentX: number;
  currentY: number;
}

const dragProperty: DragProperty = {
  targetElement: null,
  cloneElement: null,
  isMousePressed: false,
  currentX: 0,
  currentY: 0,
};

const addOpacityClass = (targetElement: HTMLElement, cloneElement: HTMLElement): void => {
  addClass(UTIL_CLASS.transparent, targetElement);
  addClass(UTIL_CLASS.clone, cloneElement);
};

const revertToOriginCard = (): void => {
  removeClass(UTIL_CLASS.transparent, dragProperty.targetElement);
  dragProperty.cloneElement.remove();
  dragProperty.isMousePressed = false;
};

const setCloneElementSize = (targetElement: HTMLElement, cloneElement: HTMLElement): void => {
  cloneElement.style.width = `${targetElement.offsetWidth}px`;
  cloneElement.style.height = `${targetElement.offsetHeight}px`;
};

const updateCloneElementPosition = (event: MouseEvent, cloneElement: HTMLElement): void => {
  cloneElement.style.top = `${event.clientY - cloneElement.offsetHeight / 2}px`;
  cloneElement.style.left = `${event.clientX - cloneElement.offsetWidth / 2}px`;
};

const mouseDownCard = ({ target }: any): void => {
  if (!target.classList.contains(CARD_CLASS.card)) return;
  dragProperty.isMousePressed = true;
  dragProperty.targetElement = target;
  dragProperty.cloneElement = target.cloneNode(true);
  setCloneElementSize(dragProperty.targetElement, dragProperty.cloneElement);
};

const mouseMoveCard = (event: MouseEvent): void => {
  if (!dragProperty.isMousePressed) return;
  addOpacityClass(dragProperty.targetElement, dragProperty.cloneElement);
  updateCloneElementPosition(event, dragProperty.cloneElement);
  containerElement.appendChild(dragProperty.cloneElement);
};

const mouseUpCard = (event: MouseEvent): void => {
  if (!dragProperty.isMousePressed) return;
  revertToOriginCard();
};

const applyDragAndDrop = (): void => {
  containerElement.addEventListener('mousedown', mouseDownCard);
  containerElement.addEventListener('mousemove', mouseMoveCard);
  containerElement.addEventListener('mouseup', mouseUpCard);
};

export default applyDragAndDrop;
