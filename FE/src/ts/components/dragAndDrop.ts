import { _q, addClass, removeClass } from '../utils/utils';
import { COLUMN_CLASS, changeCardCount, getColumnId } from './column';
import { CARD_CLASS, getCardId, setCardColumnId } from './card';
import { isCardMoved } from './fetch';
import { updateActivityList } from './sidemenu';
import { initialRenderTodoList } from './columnWrap';

const RIGHT_MOUSE_BUTTON_CODE = 2;

const INVALID_INDEX = -999;
interface DragProperty {
  targetElement: HTMLElement | null;
  sourceColumn: HTMLElement | null;
  cloneElement: HTMLElement | null;
  hoverElement: HTMLElement | null;
  hoverCardWrapElement: HTMLElement | null;
  sourceElementIndex: number;
  sourceElementPos: ClientRect | null;
  dragStartPos: object;
  isMousePressed: boolean;
  isCloneDisplay: boolean;
}

const dragProperty: DragProperty = {
  targetElement: null,
  sourceColumn: null,
  cloneElement: null,
  hoverElement: null,
  hoverCardWrapElement: null,
  sourceElementIndex: INVALID_INDEX,
  sourceElementPos: null,
  dragStartPos: {},
  isMousePressed: false,
  isCloneDisplay: false,
};

const DRAG_CLASS = {
  clone: 'clone',
  transparent: 'transparent',
  outlined: 'outlined',
};

const disableDefaultEvent = (event: Event): void => {
  event.preventDefault();
};

const getCardIndex = (cardWrapElement: HTMLElement): number => {
  if (!cardWrapElement) return INVALID_INDEX;
  const cardWrapChildNodes = cardWrapElement.childNodes;
  for (let index = 0; index < cardWrapChildNodes.length; index++) {
    if (cardWrapChildNodes[index] === dragProperty.targetElement) return index;
  }
  return INVALID_INDEX;
};

const setDragProperty = (event: MouseEvent): void => {
  dragProperty.targetElement = event.target;
  dragProperty.sourceElementPos = dragProperty.targetElement.getBoundingClientRect();
  dragProperty.dragStartPos = {
    x: event.clientX,
    y: event.clientY,
  };
  dragProperty.sourceColumn = event.target.closest(`.${COLUMN_CLASS.column}`);
  dragProperty.sourceElementIndex = getCardIndex(event.target.closest(`.${COLUMN_CLASS.cardWrap}`));
};

const resetDragProperty = (): void => {
  dragProperty.isCloneDisplay = false;
  dragProperty.isMousePressed = false;
  dragProperty.sourceColumn = null;
  dragProperty.hoverElement = null;
  dragProperty.hoverCardWrapElement = null;
  dragProperty.sourceElementPos = null;
  dragProperty.dragStartPos = null;
  dragProperty.cloneElement.remove();
  dragProperty.targetElement.focus();
  removeClass(DRAG_CLASS.transparent, dragProperty.targetElement);
};

const cloneCardElement = (event: MouseEvent): void => {
  dragProperty.cloneElement = event.target.cloneNode(true);
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
  const offsetX: number = clientX - dragProperty.dragStartPos.x;
  const offsetY: number = clientY - dragProperty.dragStartPos.y;
  const posX: number = dragProperty.sourceElementPos.x + offsetX;
  const posY: number = dragProperty.sourceElementPos.y + offsetY;
  dragProperty.cloneElement.style.transform = `translate(${posX}px, ${posY}px)`;
};

const isMousePositionedLastIndex = ({ clientX, clientY }: MouseEvent, { x, right, bottom }: DOMRect) => {
  const SENSITIVITY: number = 10;
  return clientX >= x - SENSITIVITY && clientX <= right && clientY >= bottom - SENSITIVITY;
};

const insertCard = (event: MouseEvent) => {
  dragProperty.hoverElement = event.target;
  dragProperty.hoverCardWrapElement = dragProperty.hoverElement.parentNode;
  dragProperty.hoverCardWrapElement.insertBefore(dragProperty.targetElement, dragProperty.hoverElement);
};

const insertCardLastIndex = (event: MouseEvent) => {
  const targetColumnCardWrap = event.target.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  if (!isMousePositionedLastIndex(event, targetColumnCardWrap.getBoundingClientRect())) return;
  dragProperty.hoverCardWrapElement = targetColumnCardWrap;
  dragProperty.hoverCardWrapElement.insertBefore(dragProperty.targetElement, null);
};

const changeEachColumnCardCount = (sourceColumn: HTMLElement, destinationColumn: HTMLElement): void => {
  if (destinationColumn === sourceColumn) return;
  changeCardCount(destinationColumn);
  changeCardCount(sourceColumn);
};

const undoMove = (sourceColumn: HTMLElement, destinationColumn: HTMLElement, dropCardIndex: number) => {
  const sourceCardWrap: HTMLElement = sourceColumn.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  let sourceReferenceNode: Node;
  if (dropCardIndex + 1 === dragProperty.sourceElementIndex && sourceColumn === destinationColumn) {
    sourceReferenceNode = sourceCardWrap.childNodes[dragProperty.sourceElementIndex + 1];
    sourceCardWrap.insertBefore(dragProperty.targetElement, sourceReferenceNode);
  }
  sourceReferenceNode = sourceCardWrap.childNodes[dragProperty.sourceElementIndex];
  sourceCardWrap.insertBefore(dragProperty.targetElement, sourceReferenceNode);
};

const fetchMoveCard = async (sourceColumn: HTMLElement, destinationColumn: HTMLElement, dropCardIndex: number): Promise<void> => {
  if (sourceColumn === destinationColumn && dragProperty.sourceElementIndex === dropCardIndex) return;
  const sourceColumnId = getColumnId(sourceColumn);
  const destinationColumnId = getColumnId(destinationColumn);
  const isMoved = await isCardMoved({
    sourceColumnId: sourceColumnId,
    destinationColumnId: destinationColumnId,
    cardId: getCardId(dragProperty.targetElement),
    dragCardIndex: dragProperty.sourceElementIndex,
    dropCardIndex: dropCardIndex,
  });
  if (!isMoved) {
    console.error('Move Error');
    undoMove(sourceColumn, destinationColumn, dropCardIndex);
    initialRenderTodoList();
    return;
  }
  setCardColumnId(dragProperty.targetElement, destinationColumnId);
  updateActivityList();
};

const dropCard = (dropCardIndex: number, sourceColumn: HTMLElement, destinationColumn: HTMLElement): void => {
  if (dropCardIndex === INVALID_INDEX) return;
  changeEachColumnCardCount(destinationColumn, sourceColumn);
  fetchMoveCard(sourceColumn, destinationColumn, dropCardIndex);
};

const mouseDownCard = (event: MouseEvent): void => {
  if (event.buttons === RIGHT_MOUSE_BUTTON_CODE) return;
  if (!event.target.classList.contains(CARD_CLASS.card)) return;
  window.addEventListener('selectstart', disableDefaultEvent);
  dragProperty.isMousePressed = true;
  setDragProperty(event);
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

const mouseOverCard = ({ target }: MouseEvent): void => {
  if (!dragProperty.isMousePressed) return;
  if (target.classList.contains(CARD_CLASS.card)) insertCard(event);
  if (target.className === COLUMN_CLASS.column) insertCardLastIndex(event);
};

const mouseUpCard = (): void => {
  if (!dragProperty.isMousePressed) return;
  window.removeEventListener('selectstart', disableDefaultEvent);
  const dropCardIndex = getCardIndex(dragProperty.hoverCardWrapElement);
  const sourceColumn = dragProperty.sourceColumn;
  const destinationColumn = dragProperty.targetElement.closest(`.${COLUMN_CLASS.column}`);
  resetDragProperty();
  dropCard(dropCardIndex, sourceColumn, destinationColumn);
};

const dragAndDropEvent = (targetElement: HTMLElement): void => {
  targetElement.addEventListener('mousedown', mouseDownCard);
  targetElement.addEventListener('mousemove', event => mouseMoveCard(event, targetElement));
  targetElement.addEventListener('mouseup', mouseUpCard);
  targetElement.addEventListener('mouseover', mouseOverCard);
};

export default dragAndDropEvent;
