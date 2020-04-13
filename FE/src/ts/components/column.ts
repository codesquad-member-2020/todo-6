import { ICON_TYPE, UTIL_CLASS } from '../utils/constants';
import { _q, toggleClass } from '../utils/utils';
import { inputFormElement, textareaElement, templateInputFormElement } from './inputForm';
import { templateAllCardElement } from './card';
import { Sections, createCard } from './fetch';

export const COLUMN_CLASS = {
  id: (idNum: number): string => {
    return `${idNum}c`;
  },
  column: 'column',
  titleWrap: 'column-title-wrap',
  cardCount: 'column-number',
  title: 'column-title',
  buttonWrap: 'column-button-wrap',
  addButton: 'edit-btn icon-secondary-btn material-icons',
  deleteButton: 'delete-btn icon-secondary-btn material-icons',
  cardWrap: 'card-wrap',
};

const COLUMN_ATOM = {
  titleAtoms: (atoms: string): string => `<div class="${COLUMN_CLASS.titleWrap}">${atoms}</div>`,
  cardCount: (count: number): string => `<div class="${COLUMN_CLASS.cardCount}">${count}</div>`,
  title: (name: string): string => `<h2 class="${COLUMN_CLASS.title}">${name}</h2>`,
  buttons: `<div class="${COLUMN_CLASS.buttonWrap}"><button class="${COLUMN_CLASS.addButton}">${ICON_TYPE.add}</button><button class="${COLUMN_CLASS.deleteButton}">${ICON_TYPE.delete}</button></div>`,
  inputForm: templateInputFormElement(),
  cards: (id: number, userName: string, cards: Array<any>): string => `<div class="${COLUMN_CLASS.cardWrap}">${templateAllCardElement(COLUMN_CLASS.id(id), cards, userName)}</div>`,
};

export const columnElement = (event: any): HTMLDivElement => event.target.closest(`.${COLUMN_CLASS.column}`);

export const cardWrapElement = (columnElement: any): HTMLDivElement => columnElement.querySelector(`.${COLUMN_CLASS.cardWrap}`);

export const templateColumnElement = ({ id, name, cards }: Sections, userName: string): string => {
  const cardCount = Object.keys(cards).length;
  return `<div id="${COLUMN_CLASS.id(id)}" class="${COLUMN_CLASS.column}">
  ${COLUMN_ATOM.titleAtoms(`${COLUMN_ATOM.cardCount(cardCount)}${COLUMN_ATOM.title(name)}${COLUMN_ATOM.buttons}`)}
  ${COLUMN_ATOM.inputForm}
  ${COLUMN_ATOM.cards(id, userName, cards)}</div>`;
};

export const changeCardCount = (targetColumn: any): void => {
  const countElement = targetColumn.querySelector(`.${COLUMN_CLASS.cardCount}`);
  const cardWrapElement = targetColumn.querySelector(`.${COLUMN_CLASS.cardWrap}`);
  const cardCount: number = cardWrapElement.childElementCount;
  countElement.innerHTML = cardCount;
};

const clickColumnAddButton = (event: any): void => {
  if (event.target.className !== COLUMN_CLASS.addButton) return;
  const targetColumn = columnElement(event);
  toggleClass(UTIL_CLASS.hidden, inputFormElement(targetColumn));
  textareaElement(targetColumn).focus();
};

export const addNewCard = async (targetColumn: any, cardWrap: any, textarea: HTMLTextAreaElement): void => {
  textarea.setAttribute('disabled', true);
  cardWrap.insertAdjacentHTML('afterbegin', await createCard(targetColumn.id, textarea.value));
  textarea.value = '';
  textarea.removeAttribute('disabled');
  changeCardCount(targetColumn);
};

export const columnClickHandler = (event: Event): void => {
  clickColumnAddButton(event);
};
