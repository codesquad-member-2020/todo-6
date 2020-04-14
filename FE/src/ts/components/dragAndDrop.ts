import { _q, addClass, removeClass } from '../utils/utils';
import { COLUMN_CLASS, changeCardCount } from './column';
import { CARD_CLASS } from './card';

interface DragProperty {
  targetElement: any;
  prevColumnElement: any;
  cloneElement: any;
  hoverElement: any;
  cardWrapElement: any;
  isMousePressed: boolean;
  isCloneDisplay: boolean;
}

const dragProperty: DragProperty = {
  targetElement: null,
  prevColumnElement: null,
  cloneElement: null,
  hoverElement: null,
  cardWrapElement: null,
  isMousePressed: false,
  isCloneDisplay: false,
};

const DRAG_CLASS = {
  clone: 'clone',
  transparent: 'transparent',
  outlined: 'outlined',
};

const MOUSE_RIGHT_BUTTON_CODE = 2;

const cloneCardElement = ({ target }: Event): void => {
  dragProperty.targetElement = target;
  dragProperty.prevColumnElement = target.closest(`.${COLUMN_CLASS.column}`);
  dragProperty.cloneElement = target.cloneNode(true);
};

const setCloneElementSize = (): void => {
  dragProperty.cloneElement.style.width = `${dragProperty.targetElement.offsetWidth}px`;
  dragProperty.cloneElement.style.height = `${dragProperty.targetElement.offsetHeight}px`;
};

const displayCloneElement = (containerElement: HTMLElement): void => {
  containerElement.appendChild(dragProperty.cloneElement);
};

const addOpacityClass = (): void => {
  addClass(DRAG_CLASS.transparent, dragProperty.targetElement);
  addClass(DRAG_CLASS.clone, dragProperty.cloneElement);
};

const updateCloneElementPosition = ({ clientX, clientY }: MouseEvent): void => {
  const posX: number = clientX - dragProperty.cloneElement.offsetWidth / 2;
  const posY: number = clientY - dragProperty.cloneElement.offsetHeight / 2;
  dragProperty.cloneElement.style.transform = `translate(${posX}px, ${posY}px)`;
};

const revertToOriginState = (): void => {
  dragProperty.cloneElement.remove();
  dragProperty.isCloneDisplay = false;
  dragProperty.isMousePressed = false;
  removeClass(DRAG_CLASS.transparent, dragProperty.targetElement);
};

const disableSelect = (event: Event): void => {
  event.preventDefault();
};

const isMousePositionedLastIndex = ({ clientX, clientY }: MouseEvent, { x, right, bottom }: DOMRect) => {
  const SENSITIVITY: number = 10;
  return clientX >= x - SENSITIVITY && clientX <= right && clientY >= bottom - SENSITIVITY;
};

const insertCard = (event: MouseEvent) => {
  dragProperty.hoverElement = event.target;
  dragProperty.cardWrapElement = dragProperty.hoverElement.parentNode;
  dragProperty.cardWrapElement.insertBefore(dragProperty.targetElement, dragProperty.hoverElement);
};

const insertCardLastIndex = (event: MouseEvent) => {
  dragProperty.cardWrapElement = event.target.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  if (!isMousePositionedLastIndex(event, dragProperty.cardWrapElement.getBoundingClientRect())) return;
  dragProperty.cardWrapElement.insertBefore(dragProperty.targetElement, null);
};

const getTargetCardIndex = (): number | undefined => {
  const cardWrapChildNodes = dragProperty.cardWrapElement.childNodes;
  for (let index = 0; index < cardWrapChildNodes.length; index++) {
    if (cardWrapChildNodes[index] === dragProperty.targetElement) return index;
  }
};

const mouseDownCard = async (event: MouseEvent): void => {
  if (event.buttons === MOUSE_RIGHT_BUTTON_CODE) return;
  if (!event.target.classList.contains(CARD_CLASS.card)) return;
  window.addEventListener('selectstart', disableSelect);
  dragProperty.isMousePressed = true;
  cloneCardElement(event);
  setCloneElementSize();
};

const mouseMoveCard = (event: MouseEvent, containerElement: HTMLElement): void => {
  if (!dragProperty.isMousePressed) return;
  if (!dragProperty.isCloneDisplay) {
    dragProperty.isCloneDisplay = true;
    addOpacityClass();
    displayCloneElement(containerElement);
  }
  updateCloneElementPosition(event);
};

const mouseUpCard = (): void => {
  if (!dragProperty.isMousePressed) return;
  window.removeEventListener('selectstart', disableSelect);
  const targetColumn = dragProperty.targetElement.closest(`.${COLUMN_CLASS.column}`);
  const prevColumn = dragProperty.prevColumnElement;
  if (targetColumn !== prevColumn) {
    changeCardCount(targetColumn);
    changeCardCount(prevColumn);
  }
  console.log(getTargetCardIndex());
  revertToOriginState();
};

const mouseOverCard = ({ target }: MouseEvent): void => {
  if (!dragProperty.isMousePressed) return;
  if (target.classList.contains(CARD_CLASS.card)) insertCard(event);
  if (target.className === COLUMN_CLASS.column) insertCardLastIndex(event);
};

const applyDragAndDrop = (targetElement: HTMLElement): void => {
  targetElement.addEventListener('mousedown', mouseDownCard);
  targetElement.addEventListener('mousemove', event => mouseMoveCard(event, targetElement));
  targetElement.addEventListener('mouseup', mouseUpCard);
  targetElement.addEventListener('mouseover', mouseOverCard);
};

export default applyDragAndDrop;
